import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/button/Button";
import Container from "../components/container/Container";
import { Input } from "../components/input/Input";
import { verbs } from "../data/verbs";
import "./training.css";

export const Training = () => {
  const [simple, setSimple] = useState("");
  const [particular, setParticular] = useState("");
  const [waitingScreen, setWaitingScreen] = useState(false);
  const [successScreen, setSuccessScreen] = useState(false);
  const [errorScreen, setErrorScreen] = useState(false);
  const [finalScreen, setFinalScreen] = useState(false);
  const [questionScreen, setQuestionScreen] = useState(false);
  const [question, setQuestion] = useState({});
  const [counter, setCounter] = useState(3);
  const [time, setTime] = useState(120);
  const [score, setScore] = useState({ right: 0, error: 0, name: "" });
  const [localScore, setLocalScore] = useState([]);

  const navigate = useNavigate();

  const startQuestionTimer = () => {
    const start = Math.floor(Date.now() / 1000) + 120;
    const timer = setInterval(() => {
      const data = Math.floor(Date.now() / 1000);

      setTime((prev) => prev - 1);

      if (data === start) {
        setFinalScreen(true);
        clearInterval(timer);
      }
    }, 1000);
  };

  const randomQuestion = () => {
    const number = Math.floor(Math.random() * 139);

    const item = verbs[number];

    setQuestion(item);
  };

  const checkQuestion = () => {
    const first = question.past_simple === simple;
    const second = question.past_participle === particular;
    if (first && second) {
      setSuccessScreen(true);
      setScore({
        right: score.right + 1,
        error: score.error,
        name: score.name,
      });
    } else {
      setScore({
        right: score.right,
        error: score.error + 1,
        name: score.name,
      });
      setErrorScreen(true);
    }
  };

  const nextQuestion = () => {
    randomQuestion();
    setSuccessScreen(false);
    setErrorScreen(false);
    setSimple("");
    setParticular("");
  };

  const start = () => {
    startQuestionTimer();
    setWaitingScreen(true);
    randomQuestion();
    let timerId = setInterval(
      () => setCounter((prevTime) => prevTime - 1),
      1000
    );

    setTimeout(() => {
      clearInterval(timerId);
      setCounter(3);
      setWaitingScreen(false);
      setQuestionScreen(true);
    }, 3000);
  };

  const finish = () => {
    const data = JSON.parse(localStorage.getItem("score")) || [];

    localStorage.setItem("score", JSON.stringify([score, ...data]));

    navigate("/");
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("score"));
    if (data) {
      const name = data[0]?.name || "";
      setScore({ right: 0, error: 0, name: name });
      setLocalScore(data);
    }
  }, []);

  return (
    <>
      {waitingScreen && (
        <div className="waitingScreen">
          <div>{counter}</div>
        </div>
      )}
      {successScreen && (
        <div className="waitingScreen">
          <div>Right</div>
          <p>
            <span>{question.base_form}</span>
            <span>{question.past_simple}</span>
            <span>{question.past_participle}</span>
          </p>
          <Button text="Next" onClick={nextQuestion} />
        </div>
      )}
      {errorScreen && (
        <div className="errorScreen">
          <div>Error</div>
          <p>
            <span>{question.base_form}</span>
            <span>{question.past_simple}</span>
            <span>{question.past_participle}</span>
          </p>
          <Button text="Next" onClick={nextQuestion} />
        </div>
      )}
      {finalScreen && (
        <div className="waitingScreen">
          <div>Finish</div>
          <div>Your score:</div>
          <div>Right: {score.right}</div>
          <div style={{ marginBottom: "60px" }}>Incorrect: {score.error}</div>
          <Button text="Go to main page" onClick={finish} />
        </div>
      )}

      <Container>
        <h1 onClick={() => navigate("/")} className="logo">
          IRREGULAR VERBS
        </h1>
        <div className="innerContainer">
          {!questionScreen && (
            <div>
              <Input
                value={score.name}
                onChange={(e) => setScore({ ...score, name: e })}
                placeholder="Type your name"
                tittle={"Your name"}
              />
              <Button text="Start" onClick={start} />
              <p className="tittle">Your best score:</p>
              {localScore
                .sort((a, b) => {
                  if (a.right < b.right) {
                    return 1;
                  }
                  if (a.right > b.right) {
                    return -1;
                  }
                  return 0;
                })
                .map((item, index) => {
                  if (index < 3) {
                    return (
                      <p className="scoreItem">
                        {item.name} :{" "}
                        <span style={{ color: "green" }}>{item.right}</span> /
                        <span style={{ color: "red" }}> {item.error}</span>
                      </p>
                    );
                  }
                  return null;
                })}
            </div>
          )}

          {questionScreen && (
            <div>
              <h2 style={{ marginBottom: "60px" }}>
                Time left: {time} seconds
              </h2>
              <h2>
                Type irregular form of verb:{" "}
                <span style={{ color: "green" }}>
                  {question.base_form?.toUpperCase()}
                </span>
              </h2>
              <Input
                value={simple}
                onChange={setSimple}
                placeholder="Past Simple (V2)	"
              />
              <Input
                value={particular}
                onChange={setParticular}
                placeholder="Past Participle (V3)"
              />
              <Button text="Send" onClick={checkQuestion} />
            </div>
          )}
        </div>
      </Container>
    </>
  );
};
