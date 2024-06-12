const QuestionBanner = ({ questionName, difficulty, tags }) => {
  return (
    <div className="card orange lighten-3 row">
      <div className="col s6">
        <h4>{questionName}</h4>
      </div>
      <div className="col s6">
        <h6>Difficulty: {"*".repeat(difficulty)}</h6>
        <h6>
          Tags:
          {tags.map((tag, index) => (
            <span key={index}>
              <a
                href={`https://www.google.com/search?q=${tag}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {tag}
              </a>
              {index < tags.length - 1 ? ", " : ""}
            </span>
          ))}
        </h6>
      </div>
    </div>
  );
};

export default QuestionBanner;
