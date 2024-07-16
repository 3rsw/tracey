import React, { useEffect, useRef } from 'react';
import Arr from './Arr';

const QuizFunctionHistory = ({ histories, historiesIndex, history, stepNum, topOfStack, functionName, setDataHistory }) => {

    const scrollRef = useRef();

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    const handleInputChange = (e, varName) => {
        const attempt = e.target.value;
        let newHistories = [...histories];
        newHistories[historiesIndex].vars[varName][newHistories[historiesIndex].vars[varName].length - 1].attempt = attempt;
        setDataHistory(newHistories);
      };

    // Flatten dataHistory into a single array
    let flatData = [];
    let fields = [];
    for (let key in history) {
        fields.push(key);
        history[key].forEach(item => {
            flatData.push({ step: item.step, [key]: item.value });
        });
    }
    flatData.sort((a, b) => a.step - b.step);

    // Initialize the data array with all fields set to undefined
    let data = [];

    // Merge objects with the same 'step' property and set fields to null after their first instance
    let currentData = {};
    flatData.forEach(item => {
        // If an item with the same 'step' property doesn't exist, add it to the array
        let existingItem = data.find(d => d.step === item.step);
        if (!existingItem) {
            existingItem = { 'step': item['step'] };
            data.push(existingItem);
        }

        // Add any fields that exist
        for (let key in item) {
            if (key !== 'step') {
                existingItem[key] = item[key];
                currentData[key] = item[key];
            }
        }

        // Add any mising fields
        for (let key of fields) {
            if (!(key in existingItem) && key !== 'step') {
                if (!(key in currentData)) { // Need to distinguish between var exists and var doesn't exist
                    existingItem[key] = undefined; // TODO: how to deal with undefined/<UNINITIALIZED>?
                } else {
                    existingItem[key] = null;
                }
            }
        }
    });

    // Sort the data array by the 'step' property again after all modifications
    data.sort((a, b) => a.step - b.step);

    if (data.length !== 0) {
        return (
            <div ref={scrollRef} className={`${topOfStack ? 'top-of-stack' : 'not-top-of-stack'}`} style={{ display: 'flex', flexDirection: 'column', marginBottom: "5px" }}>
                <div style={{ display: 'flex' }}>
                    <span style={{ fontWeight: "bold", color: topOfStack ? 'orange' : 'inherit' }}>{functionName}</span>
                </div>
                <div style={{ display: 'flex' }}>
                    <table className="centered" style={{ tableLayout: "fixed", margin: "5px" }}>
                        <thead style={{ position: "sticky", top: "0", backgroundColor: "white" }}>
                            <tr>
                                {[...fields].map(field => <th key={field}>{field}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {data.slice(0, -1).map((item, index) => ( // Render all but last
                                <tr key={index}>
                                    {[...fields].map(field =>
                                        <td key={field}>
                                            {item[field] === undefined ? '' : Array.isArray(item[field]) ? <Arr arr={item[field]} /> : item[field]}
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="function-history-tfoot-tr">
                                {[...fields].map(field => {
                                    return (data[data.length - 1].step === stepNum) ? <td><input type="text" onChange={(e) => handleInputChange(e, field)}/> </td>:
                                        <td key={field} className={`center-align ${data[data.length - 1][field] !== null ? 'changed-last' : 'not-changed-last'}`}>
                                            {currentData[field] === undefined ? '' : Array.isArray(currentData[field]) ? <Arr arr={currentData[field]} /> : currentData[field]}
                                        </td>
                                }
                                )}
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        );
    }
    return null;
}

export default QuizFunctionHistory;