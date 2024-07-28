

const InputArr = ({ arr, handleInputChange, field, attempt }) => {

    const handleArrayChange = (e, index) => {
        let newArr = new Array(arr.length).fill(undefined);
        if (attempt != undefined || attempt != null) {
            newArr = [...attempt];
        }

        // Parse input value to number if arr[index] is a number
        let newValue = e.target.value;
        if (newValue === '') {
            newValue = undefined;
        }
        if (typeof arr[index] === 'number') {
            newValue = parseFloat(newValue);
        }

        newArr[index] = newValue;
        handleInputChange({ target: { value: newArr } }, field);
    };

    return (
        <table className="arr-table">
            <thead>
                <tr>
                    {arr.map((item, index) => {
                        return (
                            <th key={index} className="arr-head">
                                {index}
                            </th>
                        );
                    })}
                </tr>
            </thead>
            <tbody>
                <tr>
                    {arr.map((item, index) => {
                        let inputType = "text"; // default to text
                        let maxLength;
                        if (typeof item === "number") {
                            inputType = "number";
                        } else if (typeof item === "string") {
                            const escapeSequenceCount = (item.match(/\\./g) || []).length;
                            const nonEscapeSequenceCount = item.length - escapeSequenceCount * 2;
                            if (nonEscapeSequenceCount + escapeSequenceCount === 1) {
                                maxLength = 1;
                            }
                        }
                        return (
                            <td key={index} className="arr-data">
                                <div style={{ display: 'flex', alignItems: 'center', marginLeft: index > 0 ? '5px' : '0' }}>
                                    {inputType == "text" ? <span>'</span> : null}
                                    <input
                                        type={inputType}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            const escapeSequenceCount = (value.match(/\\./g) || []).length;
                                            const nonEscapeSequenceCount = value.length - escapeSequenceCount * 2;
                                            if (maxLength === 1 && escapeSequenceCount > 0) {
                                                if (value.length > 2) {
                                                    e.target.value = value.slice(0, 2);
                                                }
                                                handleArrayChange(e, index);
                                            } else if (nonEscapeSequenceCount + escapeSequenceCount > maxLength) {
                                                e.target.value = value.slice(0, maxLength);
                                                handleArrayChange(e, index);
                                            } else {
                                                handleArrayChange(e, index);
                                            }
                                        }}
                                        onKeyPress={(e) => {
                                            if (inputType === "number" && !/[0-9]/.test(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                        style={{ textAlign: 'center' }} // Center the text within the input field
                                    />
                                    {inputType == "text" ? <span>'</span> : null}
                                </div>
                            </td>
                        );
                    })}
                </tr>
            </tbody>
        </table>
    );
};
export default InputArr;