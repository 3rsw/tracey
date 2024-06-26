

const Arr = ({ arr }) => {
    return (
        <table>
            <thead>
                <tr>
                    {arr.map((item, index) => {
                        return (
                            <th key={index}>
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
                            <td key={index}>
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