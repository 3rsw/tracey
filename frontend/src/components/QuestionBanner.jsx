import { Link } from 'react-router-dom';

const QuestionBanner = ({ questionName, difficulty, tags, mode, qnId }) => {
  return (
    <div className="card blue lighten-3 row">
      <div className="col s4">
        <h4>{questionName}</h4>
      </div>
      <div className="col s4">
        {mode === "walkthrough" ? (
          <h4>
            <button className="btn selected" >walkthrough</button>
            <Link to={`/question/${qnId}/quiz`}>
              <button className="btn unselected">quiz</button>
            </Link>
          </h4>
        ) : (
          <h4>
            <Link to={`/question/${qnId}/walkthrough`}>
              <button className="btn unselected">walkthrough</button>
            </Link>
            <button className="btn selected">quiz</button>
          </h4>
        )}
      </div>
      <div className="col s4">
        <h6>Difficulty: {"*".repeat(difficulty)}</h6>
        <h6>
          Tags:
          {tags.map((tag, index) => (
            <span key={index}>
              <Link to={`/topic/${tag}`} className={"link"}>{tag}</Link>
              {index < tags.length - 1 ? ", " : ""}
            </span>
          ))}
        </h6>
      </div>
    </div>
  );
};

export default QuestionBanner;
