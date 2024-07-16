import React, { useEffect, useRef } from 'react';
import FunctionHistory from './FunctionHistory';
import QuizFunctionHistory from './QuizFunctionHistory';

const Histories = ({ histories, stepNum, mode, setDataHistory }) => {

    const scrollRef = useRef();

    useEffect(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      },  [histories]);

    if (histories != undefined && histories.length !== 0) {
        return (
            <div ref={scrollRef} className="scrollable-div">
                { mode == "walkthrough" ? [...histories].map((history, index) =>
                    <FunctionHistory history={history.vars} 
                                     stepNum={stepNum} 
                                     topOfStack={(index) === histories.length -1} 
                                     key={index} 
                                     functionName = {history.func_name}
                    />
                ) : (
                [...histories].map((history, index) =>
                    <QuizFunctionHistory
                                    histories={histories}
                                    historiesIndex= {index}
                                    history={history.vars}
                                    stepNum={stepNum}
                                    topOfStack={(index) === histories.length -1}
                                    key={index}
                                    functionName = {history.func_name}
                                    setDataHistory={setDataHistory}
                    />
                ))}
            </div>
        );
    }
    return null;
}

export default Histories;