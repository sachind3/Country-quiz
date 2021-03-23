import { useEffect, useState } from "react";
import Options from "./Options";
import start_img from "./assets/start-img.svg";
import winner_img from "./assets/winner-img.svg";

const Quiz = (props) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isSelected, setIsSelected] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [nextquestion, setNextquestion] = useState(false);
  const [score, setScore] = useState(0);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    let questions = props.questions
      .slice()
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);
    questions.forEach((question) => {
      var random_boolean = Math.random() < 0.5;
      if (random_boolean) {
        question.type = "flag";
      }
      question.answer = question.name;
      let options = [];
      for (let i = 0; i < questions.length; i++) {
        let opt = {
          text: questions[i].name,
        };
        options.push(opt);
      }
      function generateFourOpt() {
        let lastFour = options
          .slice()
          .sort(() => Math.random() - 0.5)
          .slice(0, 4);

        if (lastFour.find((val) => val.text === question.name)) {
          question.options = lastFour;
        } else {
          generateFourOpt();
        }
      }
      generateFourOpt();
    });

    setQuestions(questions);
    console.log(questions);
  }, [props.questions, reset]);

  const gotoNext = () => {
    const nextqt = currentQuestion + 1;
    if (nextqt < questions.length) {
      setCurrentQuestion(nextqt);
      setIsSelected(false);
      setNextquestion(false);
    } else {
      setGameOver(true);
      console.log("game complete");
    }
  };

  const resetBtn = () => {
    setCurrentQuestion(0);
    setIsSelected(false);
    setGameOver(false);
    setNextquestion(false);
    setScore(0);
    setReset(!reset);
  };
  return (
    <>
      <div className="card">
        <h2 className="title">Country quiz</h2>
        {!gameOver && (
          <img src={start_img} alt="start-img" className="start_img" />
        )}
        {questions.length > 0 && !gameOver && (
          <>
            <h2 className="question">
              {questions.length &&
                questions[currentQuestion].type === "flag" && (
                  <img
                    src={questions[currentQuestion].flag}
                    alt={questions[currentQuestion].name}
                    className="flag"
                  />
                )}
              {questions.length && questions[currentQuestion].type === "flag"
                ? `Which country does this flag belong to?`
                : `${questions[currentQuestion].capital} is capital of `}
            </h2>
            <Options
              options={questions[currentQuestion].options}
              isSelected={isSelected}
              setIsSelected={setIsSelected}
              answer={questions[currentQuestion].answer}
              setGameOver={setGameOver}
              setNextquestion={setNextquestion}
              score={score}
              setScore={setScore}
            />
            {nextquestion && (
              <button onClick={gotoNext} className="nextBtn">
                Next
              </button>
            )}
          </>
        )}
        {gameOver && (
          <>
            <img src={winner_img} alt="winner" className="winner_img" />
            <h2 className="result_title">Results</h2>
            <p className="scorepara">
              You got{" "}
              <span>
                {score}/{questions.length}
              </span>
              correct answers
            </p>
            <button className="trybtn" onClick={resetBtn}>
              Try again
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Quiz;
