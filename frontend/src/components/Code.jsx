import Line from "./Line";

const Code = ({ code }) => {
  const lines = code.split('\n');

  return (
    <div className="card orange lighten-4 text-white">
      <div className="row valign-wrapper">
        <div className="col s11" style={{ padding: '10px' }}>
        {lines.map((line, index) => (
          <Line key={index} line={line} index={index} selected={true} />
        ))}
        </div>
        <div className="col s1 valign-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <i className="material-icons">arrow_upward</i>
          <i className="material-icons">arrow_downward</i>
        </div>
      </div>
    </div>
  );
}

export default Code;