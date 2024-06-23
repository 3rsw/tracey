import { useState, useEffect } from "react";
import Code from "./components/Code";
import Footer from "./components/Footer";
import QuestionBanner from "./components/QuestionBanner";
import Stdout from "./components/Stdout";
import HistoryTable from "./components/HistoryTable";
import qnService from "./services/qn";

const App = () => {

  console.log('Rendering App...');  // Debug line

  const [qn, setQn] = useState({name: "Question",
                                difficulty: "Difficulty",
                                tags: ["Tag1", "Tag2"],
                                code: "\nCode\nGoes\nHere"
  });

  const [currStepNum, setCurrStepNum] = useState(0);

  const [dataHistory, setDataHistory] = useState({});

  const [qnId, setQnId] = useState('665ac8f0f60cce18caea7674');

  const [lineNum, setLineNum] = useState(1);

  const [branches, setBranches] = useState(null);

  const [stdout, setStdout] = useState("");

  useEffect(() => {
    // Fetch data and update state
    qnService.getQn(qnId).then(qn => {
      setQn(qn)
  });
  }, []);  // Empty dependency array


const fetchNextStep = async () => {
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

  // Get step after that (for HistoryTable)
  qnService.getStep(qnId, currStepNum + 2).then(stepData => {
    setStdout(stepData.stdout);
    const decLines = stepData.vars.find(func => func.function === "main").decs??{};
    let tempDataHistory = {...dataHistory};
    for (let localVar in stepData.stack_to_render[0].encoded_locals){
      if (decLines[localVar] < stepData.line) { // TODO: should this be <= the previousStepData.line?
        if (localVar in tempDataHistory){ // Check if the variable is already in dataHistory
            if (stepData.stack_to_render[0].encoded_locals[localVar][0] == "C_ARRAY") {
              console.log("C_ARRAY"); //TODO: handle arrays
            } else {
              if (tempDataHistory[localVar].length > 0 && tempDataHistory[localVar][tempDataHistory[localVar].length - 1].value !== stepData.stack_to_render[0].encoded_locals[localVar][3]){ // if the entry isn't the same as the last variable, add a new entry to that variable
                tempDataHistory[localVar].push({step: currStepNum + 1, value: stepData.stack_to_render[0].encoded_locals[localVar][3]}); //TODO: currStepNum + 1 or + 2?
              }
            }
          } else { // If it isn't, add a new entry to dataHistory
            if (stepData.stack_to_render[0].encoded_locals[localVar][0] == "C_ARRAY") {
              console.log("C_ARRAY"); //TODO: handle arrays
            } else {
              tempDataHistory[localVar] = [{step: currStepNum + 1, value: stepData.stack_to_render[0].encoded_locals[localVar][3]}]; //TODO: currStepNum + 1 or + 2?
            }
          }
      }
    }
    setDataHistory(tempDataHistory);
  });

  setCurrStepNum(currStepNum + 1);
};

const fetchPrevStep = async () => {
  if (currStepNum != 0) {
    // Get previous step (for flow etc)
    qnService.getStep(qnId, currStepNum - 1).then(stepData => {
      setLineNum(stepData.line);
      setStdout(stepData.stdout);
      if ('branch' in stepData) {
        setBranches(stepData.branch);
      }
      else {
        setBranches(null);
      }
    });

    //Get current? step (for stdout)
    qnService.getStep(qnId, currStepNum).then(stepData => {
      setStdout(stepData.stdout);
    });

    // Remove any variables that were added in the "current" step
    let tempDataHistory = {...dataHistory};
    for (let localVar in tempDataHistory){
      if (tempDataHistory[localVar][tempDataHistory[localVar].length - 1].step === currStepNum){
        tempDataHistory[localVar].pop();
      }
    }
    setDataHistory(tempDataHistory);
    setCurrStepNum(currStepNum - 1);
  }
};

const boxes = [
                {color: "green", startCol: 13, endcol: 27},
                {color: "red", startCol: 32, endcol: 46},
                {color: "red", startCol: 13, endcol: 47}
              ]
  return (
    <div className="main-content">
      <h1>Tracey</h1>
      <div className="container">
        <QuestionBanner questionName={qn.name} difficulty={qn.difficulty} tags={qn.tags}/>
        <div className="row">
          <div className="col s6">
            <Code code={qn.code} lineNum={lineNum} branches={branches} boxes={boxes} fetchNextStep={fetchNextStep} fetchPrevStep={fetchPrevStep}/>
            <Stdout stdout={stdout}/>
          </div>
          <div className="col s6">
            <HistoryTable history={dataHistory} stepNum={21}/>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
