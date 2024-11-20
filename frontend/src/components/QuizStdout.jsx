const QuizStdout = ( {needsStdout, setEnteredStdout, enteredStdout, prevEnteredStdout, prevStdout, allStdoutHaveAttempt} ) => {
    const renderPrevEnteredStdout = () => {
        let lines = [];
        let enteredLines = prevEnteredStdout.split('\n');
        let correctLines = prevStdout.split('\n');
    
        let maxLength = Math.max(enteredLines.length, correctLines.length);
    
        for (let i = 0; i < maxLength; i++) {
            let corrections = [];
            let elements = [];
            let maxLineLength = Math.max((enteredLines[i] || '').length, (correctLines[i] || '').length);
            for (let j = 0; j < maxLineLength; j++) {
                if ((enteredLines[i] || '')[j] !== (correctLines[i] || '')[j]) {
                    corrections.push(
                        <span style={{ color: 'lightgreen' }}>{(correctLines[i] || '')[j]}</span>
                    );
                    elements.push(
                        <span style={{ color: 'salmon', textDecoration: 'line-through' }}>{(enteredLines[i] || '')[j] || '_'}</span>
                    );
                } else {
                    corrections.push(
                        <span style={{ color: 'transparent' }}>{(correctLines[i] || '')[j]}</span>
                    );
                    elements.push(
                        <span style={{ color: 'lightgreen' }}>{(enteredLines[i] || '')[j]}</span>
                    );
                }
            }
            lines.push(
                <div key={i}>
                    <div>{corrections}</div>
                    <div>{elements}</div>
                </div>
            );
        }
        return <div>{lines}</div>;
    };

    return (
        <div className="card black stdout">
            <p className="white-text monospace">{renderPrevEnteredStdout()}</p>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                { !allStdoutHaveAttempt && <span className="flashing-cursor white-text">&gt;</span> }
                <textarea 
                    className="materialize-textarea white-text" 
                    value={enteredStdout}
                    onChange={(event) => setEnteredStdout(event.target.value)}
                    disabled={!needsStdout}
                />
            </div>
        </div>
    );
}

export default QuizStdout;