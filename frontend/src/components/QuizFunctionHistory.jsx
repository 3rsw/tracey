import React, { useEffect, useRef } from 'react';
import Arr from './Arr';
import InputArr from './InputArr';
import AttemptArr from './AttemptArr';

const QuizFunctionHistory = ({ histories, historiesIndex, history, stepNum, topOfStack, functionName, setDataHistory }) => {

    const scrollRef = useRef();

    console.log("history:", history);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    const handleInputChange = (e, varName) => {
        let attempt = e.target.value;
        if (attempt === '') {
            attempt = undefined;
        }
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
            flatData.push({ step: item.step, [key]: { value: item.value, attempt: item.attempt } });
        });
    }
    flatData.sort((a, b) => a.step - b.step);
    console.log("flatData:", flatData);

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

    console.log("data:", data);
    console.log("currentData:", currentData);

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
                                    {[...fields].map(field => {
                                        if (item[field] !== undefined && item[field] !== null) {
                                            console.log('attempt', item[field].attempt, 'value', item[field].value);
                                        }
                                        return (
                                            <td key={field}>
                                                {item[field] === undefined || item[field] == null ? '' : Array.isArray(item[field].value) ? <Arr arr={item[field].value} /> : item[field].value}
                                                {" "}
                                                <span style={{ textDecoration: "line-through", color: "gray" }}>
                                                    {(item[field] === undefined || item[field] == null || item[field].attempt == undefined || JSON.stringify(item[field].attempt) == JSON.stringify(item[field].value)) ? '' : Array.isArray(item[field].attempt) ? <AttemptArr arr={item[field].value} attempt={item[field].attempt} /> : item[field].attempt}
                                                </span>
                                            </td>
                                        )
                                    })}
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="function-history-tfoot-tr">
                                {[...fields].map(field => {
                                    return (data[data.length - 1].step === stepNum && data[data.length - 1][field] !== null) ? <td> {Array.isArray(data[data.length - 1][field].value) ? <InputArr arr={data[data.length - 1][field].value} handleInputChange={handleInputChange} field={field} attempt={data[data.length - 1][field].attempt}/> : <input type="text" onChange={(e) => handleInputChange(e, field)} />} </td> :
                                        <td key={field} className={`center-align ${data[data.length - 1][field] !== null ? 'changed-last' : 'not-changed-last'}`}>
                                            {currentData[field] === undefined || currentData[field] == null ? '' : Array.isArray(currentData[field].value) ? <Arr arr={currentData[field].value} /> : currentData[field].value}
                                            {" "}
                                            <span style={{ textDecoration: "line-through", color: "gray" }}>
                                                {(currentData[field] === undefined || currentData[field] == null || currentData[field].attempt == undefined || currentData[field].attempt == currentData[field].value || data[data.length - 1][field] == null) ? '' : Array.isArray(currentData[field].attempt) ? <Arr arr={currentData[field].attempt} /> : currentData[field].attempt}
                                            </span>
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