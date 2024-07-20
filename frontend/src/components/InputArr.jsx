

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
                        } else if (typeof item === "string" && item.length === 1) {
                            maxLength = 1;
                        }
                        return (
                            <td key={index} className="arr-data">
                                <div style={{ display: 'flex', alignItems: 'center', marginLeft: index > 0 ? '5px' : '0' }}>
                                    {inputType == "text" ? <span>'</span> : null}
                                    <input
                                        type={inputType}
                                        maxLength={maxLength}
                                        onChange={(e) => handleArrayChange(e, index)}
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