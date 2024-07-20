const AttemptArr = ({ arr, attempt }) => {
    return (
        <table className="arr-table">
            <tbody>
                <tr>
                    {attempt.map((item, index) => (
                        arr[index] == item ? <td key={index} className="arr-data"></td>: 
                        <td key={index} className="arr-data">
                            {item}
                        </td>
                    ))}
                </tr>
            </tbody>
        </table>
    );
};
export default AttemptArr;