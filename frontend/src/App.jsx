import { useState, useEffect } from "react";
import Code from "./components/Code";
import Footer from "./components/Footer";
import QuestionBanner from "./components/QuestionBanner";

const App = () => {
  const code =
  "\n#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    char name[5] = {'G', 'r', 'e', 'g', '\\0'};\n    int i = 0;\n    while (name[i] != '\\0') {\n        if ((name[i] > 'a') && (name[i] < 'z')) {\n            name[i] = name[i] - 'a' + 'A';\n        }\n        i++;\n    }\n    printf(\"The name is %s\", name);\n    return 0;\n}";

const line = 9;

const branches = [10, 12]

const boxes = [
                {color: "green", startCol: 13, endcol: 27},
                {color: "red", startCol: 32, endcol: 46},
                {color: "red", startCol: 13, endcol: 47}
              ]

  return (
    <div className="main-content">
      <h1>Tracey</h1>
      <div className="container">
        <QuestionBanner questionName={"Question Name"} difficulty={4} tags={["arrays", "linked-lists"]}/>
        <div className="row">
          <div className="col s6">
            <Code code={code} lineNum={line} branches={branches} boxes={boxes}/>
          </div>
          <div className="col s6">
            <table
              className="centered"
              style={{ width: "100%", tableLayout: "fixed" }}
            >
              <thead>
                <tr>
                  <th>var_a</th>
                  <th>var_b</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>12</td>
                  <td></td>
                </tr>
                <tr>
                  <td>3</td>
                  <td></td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td className="center-align">a</td>
                  <td>
                    <div className="input-field inline col s12">
                      <input
                        id="input_var_a"
                        type="text"
                        className="validate"
                        style={{ width: "100%" }}
                      />
                      <label htmlFor="input_var_a">3</label>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
