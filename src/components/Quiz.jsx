import React, { useRef, useState } from "react";
import { data } from "../Assets/data";
import "./quiz.css";
const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [page, setPage] = useState(false);

  const check = (e, ans) => {
    document.querySelectorAll("ul li").forEach((li) => {
      li.classList.remove("correct-ans", "wrong-ans");
    });
    if (ans === data[index].ans) {
      if (page === false) {
        setScore(score + 1);
        setPage(true);
      }
      e.target.classList.add("correct-ans");
    } else {
      e.target.classList.add("wrong-ans");
    }
  };
  const next = () => {
    if (index < data.length - 1) {
      setIndex(index + 1);
    } else {
      showScore();
    }
    setPage(false);
    document.querySelectorAll("ul li").forEach((li) => {
      li.classList.remove("correct-ans", "wrong-ans");
    });
  };

  const showScore = () => {
    const result = document.querySelector(".container");
    result.style.display = "none";

    const showResult = document.createElement("div");
    showResult.className = "container-res";
    document.body.appendChild(showResult);

    const scoreElement = document.createElement("div");
    scoreElement.className = "score";
    scoreElement.textContent = `Your score is : ${score}`;
    showResult.appendChild(scoreElement);

    const reStart = document.createElement("button");
    reStart.textContent = "Restart";
    reStart.className = "btn-re";
    reStart.addEventListener('click', () => {
      setIndex(0);
      setScore(0);
      setPage(false);
      result.style.display = "flex";
      document.body.removeChild(showResult);
    });
    showResult.appendChild(reStart);
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr></hr>
      <h2>
        {index + 1}. {data[index].question}
      </h2>
      <p>
        {score} of {data.length}{" "}
      </p>
      <ul>
        <li onClick={(e) => check(e, 1)}>{data[index].option1}</li>
        <li onClick={(e) => check(e, 2)}>{data[index].option2}</li>
        <li onClick={(e) => check(e, 3)}>{data[index].option3}</li>
        <li onClick={(e) => check(e, 4)}>{data[index].option4}</li>
      </ul>
      <button className="btn" onClick={next}>
        Next
      </button>
      <div className="index">
        {index + 1} / {data.length}{" "}
      </div>
    </div>
  );
};

export default Quiz;
