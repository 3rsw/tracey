import Xarrow from "react-xarrows";

const QuizArrows = ({ lineNum, branches, hoveredLine, clickedLine }) => {
  if (branches !== null) {
    return (
      <>
        <Xarrow
          start={`trueline${lineNum}`}
          end={`trueline${branches[0]}`}
          strokeWidth={branches[0] === clickedLine ? 3 : 1}
          startAnchor="left"
          endAnchor="left"
          path={"straight"}
          color={branches[0] === hoveredLine ? 'darkblue' : 'cornflowerblue'}
          showHead={false}
        />
        <Xarrow
          start={`trueline${branches[0]}`}
          end={`line${branches[0]}`}
          strokeWidth={branches[0] === clickedLine ? 3 : 1}
          headSize={branches[0] === clickedLine ? 2 : 6}
          startAnchor="left"
          endAnchor="left"
          path={"straight"}
          color={branches[0] === hoveredLine ? 'darkblue' : 'cornflowerblue'}
        />

        <Xarrow
          start={`falseline${lineNum}`}
          end={`falseline${branches[1]}`}
          strokeWidth={branches[1] === clickedLine ? 3 : 1}
          headSize={branches[1] === clickedLine ? 2 : 6}
          startAnchor="left"
          endAnchor="left"
          path={"straight"}
          color={branches[1] === hoveredLine ? 'darkblue' : 'cornflowerblue'}
          showHead={false}
        />
        <Xarrow
          start={`falseline${branches[1]}`}
          end={`line${branches[1]}`}
          strokeWidth={branches[1] === clickedLine ? 3 : 1}
          headSize={branches[1] === clickedLine ? 2 : 6}
          startAnchor="left"
          endAnchor="left"
          path={"straight"}
          color={branches[1] === hoveredLine ? 'darkblue' : 'cornflowerblue'}
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

export default QuizArrows;
