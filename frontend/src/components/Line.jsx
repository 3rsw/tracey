import CodeEditor, { SelectionText } from "@uiw/react-textarea-code-editor";

const Line = ({line, index, selected}) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ width: '20px', textAlign: 'center', fontSize: '0.8em', lineHeight: '1' }}>{selected ? '➤' : ''}</span>
            <CodeEditor
                value={line}
                language="c"
                padding={1}
                readOnly={true}
                style={{backgroundColor: "#ffe0b2"}}
            />
        </div>
    );
}

export default Line