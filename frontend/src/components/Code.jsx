import Arrows from "./Arrows";
import Line from "./Line";
import Xarrow from "react-xarrows";

const Code = ({ code, lineNum, boxes, branches, fetchNextStep, fetchPrevStep, allVarsHaveAttempt, canFetchNext, canFetchPrev }) => {
  const lines = code.split("\n");

  return (
    <div className="card grey lighten-3 text-white code" style={{ position: 'relative' }}>
        <div className="scrollable-div" style={{ padding: "10px", position: 'relative' }}>
          {lines.map((line, index) => (
            <Line
              key={index}
              line={line}
              index={index}
              isCurrentLine={index + 1 === lineNum}
              boxes={boxes}
            />
          ))}
          <Arrows branches={branches} lineNum={lineNum} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            position: 'absolute',
            top: '50%',
            right: 0,
            transform: 'translateY(-50%)',
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
  );
};

export default Code;