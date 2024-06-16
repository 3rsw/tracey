import CodeEditor, { SelectionText } from "@uiw/react-textarea-code-editor";
import rehypePrism from "rehype-prism-plus";
import rehypeRewrite from "rehype-rewrite";

const Line = ({ line, index, selected, boxes }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
        <span
          id={`arrowline${index + 1}`}
          style={{
            width: "20px",
            textAlign: "center",
            fontSize: "0.8em",
            lineHeight: "1",
          }}
        >
          {selected ? "➤" : ""}
        </span>
        <span id={`falseline${index + 1}`} style={{width: "10px"}}></span>
        <span id={`trueline${index + 1}`}  style={{width: "10px"}}></span>
        <div id={`line${index + 1}`} style={{ display: "inline-flex", alignItems: "center" }}>
            <CodeEditor
            value={line}
            language="c"
            padding={1}
            readOnly={true}
            style={{ backgroundColor: "#ffe0b2" }}
            rehypePlugins={[
                [rehypePrism, { ignoreMissing: true }],
                [
                  rehypeRewrite,
                  {
                    rewrite: (node, index, parent) => {
                      if (node.properties?.className?.includes("code-line")) {
                        if (index === 0 && node.properties?.className) {
                          node.properties.className.push("demo01");
                          console.log("~~~", index, node.properties?.className);
                        }
                      }
                      if (node.type === "text") {
                        if (node.value === "name[i] > 'a'") {
                          parent.properties.className.push("demo123");
                          // console.log("node123", node.value);
                          // console.log("node111.properties.className", parent);
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

export default Line;
