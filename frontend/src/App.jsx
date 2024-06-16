import { useState, useEffect } from "react";
import Code from "./components/Code";
import Footer from "./components/Footer";
import QuestionBanner from "./components/QuestionBanner";
import Stdout from "./components/Stdout";
import HistoryTable from "./components/HistoryTable";

const App = () => {
  const code =
  "\n#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    char name[5] = {'G', 'r', 'e', 'g', '\\0'};\n    int i = 0;\n    while (name[i] != '\\0') {\n        if ((name[i] > 'a') && (name[i] < 'z')) {\n            name[i] = name[i] - 'a' + 'A';\n        }\n        i++;\n    }\n    printf(\"The name is %s\", name);\n    return 0;\n}";

const line = 9;

const branches = [10, 12]

// const dataHistory = {name: [
//                         undefined,
//                         undefined,
//                         ['G', 'r', 'e', 'g', '\0'],
//                         null,
//                         null,
//                         null,
//                         null,
//                         null,
//                         null,
//                         ['G', 'R', 'e', 'g', '\0'],
//                         null,
//                         null,
//                         null,
//                         ['G', 'R', 'E', 'g', '\0'],
//                         null,
//                         null,
//                         null,
//                         ['G', 'R', 'E', 'G', '\0'],
//                         null,
//                         null,
//                         null,
//                         null
//                       ],
//                       i: [
//                         undefined,
//                         undefined,
//                         undefined,
//                         0,
//                         null,
//                         null,
//                         1,
//                         null,
//                         null,
//                         null,
//                         2,
//                         null,
//                         null,
//                         null,
//                         3,
//                         null,
//                         null,
//                         null,
//                         4,
//                         null,
//                         null,
//                         null
//                       ]};

const dataHistory = {name: [
                                {step: 2, value: ['G', 'r', 'e', 'g', '\0']},
                                {step: 9, value: ['G', 'R', 'e', 'g', '\0']},
                                {step: 13, value: ['G', 'R', 'E', 'g', '\0']},
                                {step: 17, value: ['G', 'R', 'E', 'G', '\0']}
                              ],
                          i: [
                            {step: 3, value: 0},
                            {step: 6, value: 1},
                            {step: 10, value: 2},
                            {step: 14, value: 3},
                            {step: 18, value: 4}
                          ]
                        };

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
            <Stdout stdout={"The name is GREG"}/>
          </div>
          <div className="col s6">
            <HistoryTable history={dataHistory} stepNum={21}/>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
