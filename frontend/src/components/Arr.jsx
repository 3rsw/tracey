

const Arr = ({ arr }) => {
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
                        return (
                            <td key={index} className="arr-data">
                                {item}
                            </td>
                        );
                    })}
                </tr>
            </tbody>
        </table>
    );
};
export default Arr;