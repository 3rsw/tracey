import React, { useEffect, useRef } from 'react';
import Arr from './Arr';
import InputArr from './InputArr';
import AttemptArr from './AttemptArr';

const QuizFunctionHistory = ({ histories, historiesIndex, history, stepNum, topOfStack, functionName, setDataHistory }) => {

    const scrollRef = useRef();

    // Initialize the data array with all fields set to undefined
    let data = [];

    console.log("history:", history);

    // Scrolls to the bottom of the history when it is updated
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    // Deals with uninitialized variables so they don't need to be entered by the student
    useEffect(() => {
        const lastData = data[data.length - 1];
        for (let field in lastData) {
            const lastDataField = lastData[field];
            if (lastDataField && lastDataField.value === "<UNINITIALIZED>") {
                let newHistories = [...histories];
                newHistories[historiesIndex].vars[field][newHistories[historiesIndex].vars[field].length - 1].attempt = "<UNINITIALIZED>";
                setDataHistory(newHistories);
            }
        }
    }, [data]);

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
            <div ref={scrollRef} className={`${topOfStack ? 'top-of-stack' : 'not-top-of-stack'}`} style={{ display: 'flex', flexDirection: 'column', marginBottom: "5px", backgroundColor: 'white' }}>
                <div style={{ display: 'flex' }}>
                    <span style={{ fontWeight: "bold", color: topOfStack ? 'blue' : 'inherit' }}>{functionName}</span>
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
                                                    {(item[field] === undefined || item[field] == null || item[field].attempt == undefined || (typeof item[field].attempt === 'object' ? JSON.stringify(item[field].attempt) : item[field].attempt) == (typeof item[field].value === 'object' ? JSON.stringify(item[field].value) : item[field].value)) ? '' : Array.isArray(item[field].attempt) ? <AttemptArr arr={item[field].value} attempt={item[field].attempt} /> : item[field].attempt}
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
                                    const lastData = data[data.length - 1];
                                    const lastDataField = lastData[field];
                                    const currentDataField = currentData[field];

                                    if (lastData.step === stepNum && lastDataField !== null) {
                                        const isValueArray = Array.isArray(lastDataField.value);
                                        return ( // Needs input
                                            <td  className={`center-align`}>
                                                {
                                                    (() => {
                                                        if (lastDataField.value === "<UNINITIALIZED>") {
                                                            return (
                                                                <span>&lt;UNINITIALIZED&gt;</span>
                                                            );
                                                        } else if (isValueArray) {
                                                            return <InputArr arr={lastDataField.value} handleInputChange={handleInputChange} field={field} attempt={lastDataField.attempt} />;
                                                        } else {
                                                            return <input type="text" onChange={(e) => handleInputChange(e, field)} />;
                                                        }
                                                    })()
                                                }
                                            </td>
                                        );
                                    }

                                    const isCurrentDataFieldDefined = currentDataField !== undefined && currentDataField !== null;
                                    const isValueArray = isCurrentDataFieldDefined && Array.isArray(currentDataField.value);
                                    const isAttemptArray = isCurrentDataFieldDefined && Array.isArray(currentDataField.attempt);
                                    const isAttemptSameAsValue = isCurrentDataFieldDefined && currentDataField.attempt == currentDataField.value;
                                    const isLastDataFieldNull = lastDataField === null;

                                    return ( // Doesn't need input
                                        <td key={field} className={`center-align ${lastDataField !== null ? 'changed-last' : 'not-changed-last'}`}>
                                            {isCurrentDataFieldDefined ? (isValueArray ? <Arr arr={currentDataField.value} /> : currentDataField.value) : ''}
                                            {" "}
                                            <span style={{ textDecoration: "line-through", color: "gray" }}>
                                                {isCurrentDataFieldDefined && !isAttemptSameAsValue && !isLastDataFieldNull
                                                    ? (isAttemptArray ? <Arr arr={currentDataField.attempt} /> : currentDataField.attempt)
                                                    : ''}
                                            </span>
                                        </td>
                                    );
                                })}
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