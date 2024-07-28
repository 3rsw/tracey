import { useState, useEffect } from "react";
import QuizCode from "../components/QuizCode";
import Footer from "../components/Footer";
import QuestionBanner from "../components/QuestionBanner";
import QuizStdout from "../components/QuizStdout";
import Histories from "../components/Histories";
import qnService from "../services/qn";
import NavBar from "../components/NavBar";
import { useParams } from "react-router-dom";

const Quiz = () => {

  console.log('Rendering App...');

  const [qn, setQn] = useState({name: "Question",
                                difficulty: "Difficulty",
                                tags: ["Tag1", "Tag2"],
                                code: "\nCode\nGoes\nHere",
                                numberOfSteps: 1
  });

  const [currStepNum, setCurrStepNum] = useState(0);

  const [dataHistory, setDataHistory] = useState([]);

  const { qnId } = useParams();

  const [lineNum, setLineNum] = useState(1);

  const [branches, setBranches] = useState(null);
  const [prevBranches, setPrevBranches] = useState(null);

  const [clickedLine, setClickedLine] = useState(null);
  const [prevClickedLine, setPrevClickedLine] = useState(null);

  const [stdout, setStdout] = useState(""); // Current stdout for this step, does include all the previous stdout too
  const [prevStdout, setPrevStdout] = useState(""); // Stdout minus that entered in the current step
  const [enteredStdout, setEnteredStdout] = useState(""); // Stdout entered by user, does not include any history
  const [prevEnteredStdout, setPrevEnteredStdout] = useState(""); // Historical stdout entered by user, doesn't include any history

  const [allVarsHaveAttempt, setAllVarsHaveAttempt] = useState(true);
  const [allArrowsHaveAttempt, setAllArrowsHaveAttempt] = useState(true);
  const [allStdoutHaveAttempt, setAllStdoutHaveAttempt] = useState(true);

  // Stack of the stackFrames of the returned functions
  // so that the back buttons work if there are functions involved
  const [returnedFunctions, setReturnedFunctions] = useState([]);

  useEffect(() => {
    // Fetch data and update state
    qnService.getQn(qnId).then(qn => {
      setQn(qn)
  });
  }, []);

  useEffect(() => {
    for (let stackFrame of dataHistory) {
      for (let localVar in stackFrame.vars) {
        for (let entry of stackFrame.vars[localVar]) {
          if (entry.attempt === undefined) {
            setAllVarsHaveAttempt(false);
            return;
          }
          if (Array.isArray(entry.value)) {
            for (let val of entry.attempt) {
              if (val === undefined) {
                setAllVarsHaveAttempt(false);
                return;
              }
            }
          }
        }
      }
    }
    setAllVarsHaveAttempt(true);
  }, [dataHistory]);

  useEffect(() => {
    if (branches != null && clickedLine == null) {
      setAllArrowsHaveAttempt(false);
    } else {
      setAllArrowsHaveAttempt(true);
    }
  }, [branches, clickedLine]);

  useEffect(() => {
    if (stdout.length == 0) {
      setAllStdoutHaveAttempt(true);
    } else if ((prevEnteredStdout + enteredStdout).length == 0) {
      setAllStdoutHaveAttempt(false);
    } else {
      // Make sure the number of segments separated by a newline in enteredStdout is the same as stdout
      // get rid of any segments that are of length 0 at the very end
      let enteredStdoutSegments = (prevEnteredStdout + enteredStdout).split("\n"); //Lenient newline addition should make this fine
      let stdoutSegments = stdout.split("\n");
      enteredStdoutSegments = removeTrailingEmptySegments(enteredStdoutSegments);
      stdoutSegments = removeTrailingEmptySegments(stdoutSegments);

      console.log("enteredStdoutSegments", enteredStdoutSegments);
      console.log("stdoutSegments", stdoutSegments);
      if (enteredStdoutSegments.length < stdoutSegments.length) {
        setAllStdoutHaveAttempt(false);
      } else {
        setAllStdoutHaveAttempt(true);
      }
    }
  }, [stdout, enteredStdout]);

  const removeTrailingEmptySegments = (segments) => {
    while (segments.length > 0 && segments[segments.length - 1].length === 0) {
        segments.pop();
    }
    return segments;
}


const fetchNextStep = async () => {
  if (qn.numberOfSteps - 1 <= currStepNum) {
    return;
  }

  setPrevBranches(branches);
  setPrevClickedLine(clickedLine);
  setClickedLine(null);
  setPrevStdout(stdout);
  setEnteredStdout("");
  // Lenient end of line newline addition
  // Students likely have the assumption that only filling out the single line is enough to imply newline
  // add a '\n' to the end of enteredStdout if it doesn't have one but stdout does
  if (enteredStdout.length > 0 && enteredStdout[enteredStdout.length - 1] !== '\n' && stdout[stdout.length - 1] === '\n') {
    setPrevEnteredStdout(prevEnteredStdout + enteredStdout + '\n');
  } else {
    setPrevEnteredStdout(prevEnteredStdout + enteredStdout);
  }

  // Get next step (for flow etc)
  qnService.getStep(qnId, currStepNum + 1).then(stepData => {
    setLineNum(stepData.line);
    if ('branch' in stepData) {
      setBranches(stepData.branch);
    }
    else {
      setBranches(null);
    }
  });
  // If it's not the last step, get step after that (for HistoryTable)
  if (qn.numberOfSteps >= currStepNum +2) {
    console.log("last step")
    qnService.getStep(qnId, currStepNum + 2).then(stepData => {
      setStdout(stepData.stdout);
      let tempDataHistory = [ ...dataHistory ];
      //Check stack frame matches
      let topStackFramePremature = false;
      if (stepData.stack_to_render.length < dataHistory.length) { // We have returned from a function
        console.log("returnedFunctions", returnedFunctions);
        setReturnedFunctions([...returnedFunctions??[], tempDataHistory.pop()]);
      } else if (stepData.stack_to_render.length > dataHistory.length) { // We have entered a new function
        tempDataHistory.push({func_name: stepData.stack_to_render[stepData.stack_to_render.length - 1].func_name, vars: {}})
        // We actually want to skp the variable changing in the new top stack frame because we don't want it to show up yet.
        if (stepData.stack_to_render.length != 1) { // Don't do for main
          topStackFramePremature = true;
        }
      }
      // Go through each stack frame and check if the variables have changed
      // Need to go through all stack frames because pointers
      stepData.stack_to_render.map((stackFrame, index) => {
        console.log(index);
        if (!topStackFramePremature || index != stepData.stack_to_render.length - 1) {
          const decLines = stepData.vars.find(func => func.function === stackFrame.func_name).decs ?? {};
          const params = stepData.vars.find(func => func.function === stackFrame.func_name).params ?? [];
          for (let localVar in stackFrame.encoded_locals) {
            let stackFrameVars = tempDataHistory[index].vars;
            if (decLines[localVar] < stepData.line || params.includes(localVar) || localVar in stackFrameVars) { // Account for the variables in other functions that may be declared lower down
              if (localVar in stackFrameVars) { // Check if the variable is already in dataHistory
                if (stackFrameVars[localVar].length > 0) {
                  let varLastEntry = stackFrameVars[localVar][stackFrameVars[localVar].length - 1].value;
                  if (stackFrame.encoded_locals[localVar][0] == "C_ARRAY") {
                    let arr = [];
                    stackFrame.encoded_locals[localVar].forEach((item, index) => {
                      if (index >= 3) {
                        arr.push(item[3]);
                      }
                    });
                    // Check if arr is the same as the previous entry
                    if ((arr.length === varLastEntry.length && arr.every((value, index) => value === varLastEntry[index]) != true)) {
                      stackFrameVars[localVar].push({ step: currStepNum + 1, value: arr });
                    }

                  } else {
                    if (varLastEntry !== stackFrame.encoded_locals[localVar][3]) { // if the entry isn't the same as the last variable, add a new entry to that variable
                      stackFrameVars[localVar].push({ step: currStepNum + 1, value: stackFrame.encoded_locals[localVar][3] });
                    }
                  }
                }
              } else { // If it isn't, add a new entry to dataHistory
                if (stackFrame.encoded_locals[localVar][0] == "C_ARRAY") {
                  let arr = [];
                  stackFrame.encoded_locals[localVar].forEach((item, index) => {
                    if (index >= 3) {
                      arr.push(item[3]);
                    }
                  });
                  stackFrameVars[localVar] = [{ step: currStepNum + 1, value: arr }];
                } else {
                  stackFrameVars[localVar] = [{ step: currStepNum + 1, value: stackFrame.encoded_locals[localVar][3] }];
                }
              }
            }
          }
        }
      });
      setDataHistory(tempDataHistory);
    });
  }
  setCurrStepNum(currStepNum + 1);
};


// Don't need to fetch previous step in Quiz

const boxes = [
                {color: "green", startCol: 13, endcol: 27},
                {color: "red", startCol: 32, endcol: 46},
                {color: "red", startCol: 13, endcol: 47}
              ]
  return (
    <div className="main-content">
      <NavBar/>
      <div className="container">
        <QuestionBanner questionName={qn.name} difficulty={qn.difficulty} tags={qn.tags} mode={"quiz"} qnId={qnId}/>
        <div className="row">
          <div className="col s6">
            <QuizCode code={qn.code} lineNum={lineNum} branches={branches} prevBranches={prevBranches} clickedLine={clickedLine} setClickedLine={setClickedLine} prevClickedLine={prevClickedLine} boxes={boxes} fetchNextStep={fetchNextStep} allInputsHaveAttempt={allVarsHaveAttempt && allArrowsHaveAttempt && allStdoutHaveAttempt} canFetchNext={qn.numberOfSteps - 1 > currStepNum} />
          </div>
          <div className="col s6">
            <Histories histories={dataHistory} stepNum={currStepNum} mode={"quiz"} setDataHistory={setDataHistory} />
          </div>
        </div>
        <div className="row">
          <QuizStdout needsStdout={stdout != "" && prevStdout.length != stdout.length} setEnteredStdout={setEnteredStdout} enteredStdout={enteredStdout} prevEnteredStdout={prevEnteredStdout} prevStdout={prevStdout} allStdoutHaveAttempt={allStdoutHaveAttempt}/>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Quiz;
