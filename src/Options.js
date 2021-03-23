const Options = ({
  options,
  isSelected,
  setIsSelected,
  answer,
  setGameOver,
  setNextquestion,
  score,
  setScore,
}) => {
  const checkAns = (ans, e) => {
    if (ans !== answer) {
      e.target.classList.add("wrong");
      setTimeout(() => {
        setGameOver(true);
      }, 1000);
    } else {
      setScore(score + 1);
      setNextquestion(true);
    }
    setIsSelected(true);
  };
  const letters = ["A", "B", "C", "D"];
  return (
    <div className="options">
      {options.map((option, index) => {
        return (
          <button
            key={index}
            onClick={(e) => checkAns(option.text, e)}
            className={isSelected && option.text === answer ? "correct" : ""}
            disabled={isSelected}
          >
            {letters[index]}. {option.text}
          </button>
        );
      })}
    </div>
  );
};

export default Options;
