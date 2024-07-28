import CodeEditor, { SelectionText } from "@uiw/react-textarea-code-editor";
import rehypePrism from "rehype-prism-plus";
import rehypeRewrite from "rehype-rewrite";

const QuizLine = ({ line, index, isCurrentLine, isHovered, isClicked, boxes, prevBranches, prevClickedLine, onMouseEnter, onMouseLeave, onClick }) => {

  let backgroundColor = "#EEEEEE";
  let color = 'black';

  if (isClicked == true) {
    backgroundColor = 'lightblue';
  }
  if (prevBranches !== null) {
    if (isCurrentLine) {
      backgroundColor = 'lightgreen';
      color = 'green';
    } else if (prevClickedLine === index + 1) {
      backgroundColor = 'orange';
    }
  }


  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick} style={{ display: "flex", alignItems: "center" }}>
      <span
        id={`arrowline${index + 1}`}
        style={{
          width: "20px",
          textAlign: "center",
          fontSize: "0.8em",
          lineHeight: "1",
          color: color,
        }}
      >
        {isCurrentLine ? "➤" : ""}
      </span>
      <span id={`falseline${index + 1}`} style={{ width: "10px" }}></span>
      <span id={`trueline${index + 1}`} style={{ width: "10px" }}></span>
      <div id={`line${index + 1}`} style={{ display: "inline-flex", alignItems: "center" }}>
        <CodeEditor
          value={line}
          data-color-mode="light"
          language="c"
          padding={1}
          readOnly={true}
          style={{ backgroundColor: backgroundColor, fontWeight: isClicked ? "bold" : "normal" }}
          rehypePlugins={[
            [rehypePrism, { ignoreMissing: true }],
            [
              rehypeRewrite,
              {
                rewrite: (node, index, parent) => {
                  if (node.properties?.className?.includes("code-line")) {
                    if (index === 0 && node.properties?.className) {
                      node.properties.className.push("demo01");
                    }
                  }
                  if (node.type === "text") {
                    if (node.value === "name[i] > 'a'") {
                      parent.properties.className.push("demo123");
                    }
                  }
                }
              }
            ]
          ]}
        />
      </div>
    </div>
  );
};

export default QuizLine;
