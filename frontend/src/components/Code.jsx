import Arrows from "./Arrows";
import Line from "./Line";
import Xarrow from "react-xarrows";

const Code = ({ code, lineNum, boxes, branches, fetchNextStep, fetchPrevStep, allVarsHaveAttempt, canFetchNext, canFetchPrev }) => {
  const lines = code.split("\n");

  return (
    <div className="card grey lighten-3 text-white code" style={{ position: 'relative' }}>
      <div className="row valign-wrapper" style={{ position: 'relative' }}>
        <div className="col" style={{ padding: "10px" }}>
          {lines.map((line, index) => (
            <Line
              key={index}
              line={line}
              index={index}
              isCurrentLine={index + 1 === lineNum}
              boxes={boxes}
            />
          ))}
        </div>
        <div
          className="col s1 valign-wrapper"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >

          <button onClick={fetchPrevStep} className="btn unselected" style={{visibility: !canFetchPrev ? 'hidden' : 'visible'}}>
            <i className="material-icons">arrow_upward</i>
          </button>

          <button onClick={fetchNextStep}  className={`btn unselected`} style={{visibility: !canFetchNext ? 'hidden' : 'visible'}}>
            <i className="material-icons">arrow_downward</i>
          </button>
        </div>
      </div>
      <Arrows branches={branches} lineNum={lineNum} />
    </div>
  );
};

export default Code;
