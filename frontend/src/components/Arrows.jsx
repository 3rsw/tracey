import Xarrow from "react-xarrows";

const Arrows = ({ lineNum, branches }) => {
  if (branches !== null) {
    return (
      <>
        <Xarrow
          start={`trueline${lineNum}`}
          end={`trueline${branches[0]}`}
          strokeWidth={1}
          startAnchor="left"
          endAnchor="left"
          path={"straight"}
          color="grey"
          showHead={false}
        />
        <Xarrow
          start={`trueline${branches[0]}`}
          end={`line${branches[0]}`}
          strokeWidth={1}
          startAnchor="left"
          endAnchor="left"
          path={"straight"}
          color="grey"
        />

        <Xarrow
          start={`falseline${lineNum}`}
          end={`falseline${branches[1]}`}
          strokeWidth={1}
          startAnchor="left"
          endAnchor="left"
          path={"straight"}
          color="grey"
          showHead={false}
        />
        <Xarrow
          start={`falseline${branches[1]}`}
          end={`line${branches[1]}`}
          strokeWidth={1}
          startAnchor="left"
          endAnchor="left"
          path={"straight"}
          color="grey"
        />
        <Xarrow
          start={`arrowline${lineNum}`}
          end={`line${lineNum}`}
          strokeWidth={1}
          startAnchor="middle"
          endAnchor="left"
          path={"straight"}
          color="black"
          showHead={false}
        />

      </>
    );
  }
  return null;

};

export default Arrows;
