

const HistoryTable = ({ history, stepNum }) => {

    const dataHistory = {
        name: [
            { step: 2, value: ['G', 'r', 'e', 'g', '\0'] },
            { step: 9, value: ['G', 'R', 'e', 'g', '\0'] },
            { step: 13, value: ['G', 'R', 'E', 'g', '\0'] },
            { step: 17, value: ['G', 'R', 'E', 'G', '\0'] }
        ],
        i: [
            { step: 3, value: 0 },
            { step: 6, value: 1 },
            { step: 10, value: 2 },
            { step: 14, value: 3 },
            { step: 18, value: 4 }
        ]
    };

    // // Need to transform it into
    // const data = [
    //     { step: 2, name: ['G', 'r', 'e', 'g', '\0'], i: undefined },
    //     { step: 3, i: 0 },
    //     { step: 6, i: 1 },
    //     { step: 9, name: ['G', 'R', 'e', 'g', '\0']},
    //     { step: 10, i: 2 },
    //     { step: 13, name: ['G', 'R', 'E', 'g', '\0']},
    //     { step: 14, i: 3 },
    //     { step: 17, name: ['G', 'R', 'E', 'G', '\0']},
    //     { step: 18, i: 4 }
    // ]

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
                if (!(key in currentData)) {
                    existingItem[key] = undefined;
                } else {
                    existingItem[key] = null;
                }
            }
        }
    });

    // Sort the data array by the 'step' property again after all modifications
    data.sort((a, b) => a.step - b.step);

    console.log(data);

    if (data.length !== 0) {
        return (
            <table className="centered" style={{ width: "100%", tableLayout: "fixed" }}>
                <thead>
                    <tr>
                        {[...fields].map(field => <th key={field}>{field}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {data.slice(0, -1).map((item, index) => (
                        <tr key={index}>
                            {[...fields].map(field =>
                                <td key={field}>
                                    {item[field] === undefined ? '<UNINITIALIZED>' : Array.isArray(item[field]) ? item[field].join('') : item[field]}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        {[...fields].map(field =>
                            <td key={field} className={`center-align ${data[data.length - 1][field] !== null ? 'changedThisStep' : 'notChangedThisStep'}`}>
                                {currentData[field] === undefined ? '<UNINITIALIZED>' : Array.isArray(currentData[field]) ? currentData[field].join('') : currentData[field]}
                            </td>
                        )}
                    </tr>
                </tfoot>
            </table>
        );
    }
    return null;
}

export default HistoryTable;