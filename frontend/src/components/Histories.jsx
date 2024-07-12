import React, { useEffect, useRef } from 'react';
import FunctionHistory from './FunctionHistory';

const Histories = ({ histories, stepNum }) => {

    const scrollRef = useRef();

    useEffect(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      },  [histories]);

    if (histories != undefined && histories.length !== 0) {
        return (
            <div ref={scrollRef} className="scrollable-div">
                {[...histories].map((history, index) =>
                    <FunctionHistory history={history.vars} 
                                     stepNum={stepNum} 
                                     topOfStack={(index) === histories.length -1} 
                                     key={index} 
                                     functionName = {history.func_name}
                    />
                )}
            </div>
        );
    }
    return null;
}

export default Histories;