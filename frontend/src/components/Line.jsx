import CodeEditor, { SelectionText } from "@uiw/react-textarea-code-editor";
import rehypePrism from "rehype-prism-plus";
import rehypeRewrite from "rehype-rewrite";

const Line = ({ id, line, index, selected, boxes }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
        <span
          id={`arrow${id}`}
          style={{
            width: "20px",
            textAlign: "center",
            fontSize: "0.8em",
            lineHeight: "1",
          }}
        >
          {selected ? "➤" : ""}
        </span>
        <span id={`false${id}`} style={{width: "10px"}}></span>
        <span id={`true${id}`}  style={{width: "10px"}}></span>
        <div id={id} style={{ display: "inline-flex", alignItems: "center" }}>
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
                        if (node.value === "return" && parent.children.length === 1) {
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
