/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();
  // const [timeStarted, setTimeStarted] = useState();
  // const [timeExpired, setTimeExpired] = useState();

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  function handleStart() {
    // setTimeRemaining(targetTime * 1000);

    // timer.current = setTimeout(() => {
    // setTimeExpired(true);
    //   dialog.current.open();
    // }, targetTime * 1000);
    // setTimeStarted(true);

    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
  }

  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    // setTimeout(timer.current);
    dialog.current.open();
  }

  function handleReset() {
    setTimeRemaining(targetTime * 1000);
  }

  function handleStop() {
    clearInterval(timer.current);
    // setTimeout(timer.current);
    dialog.current.open();
  }

  return (
    <>
      <ResultModal
        timeRemaining={timeRemaining}
        ref={dialog}
        targetTime={targetTime}
        onReset={handleReset}
        // result={timeRemaining === targetTime * 1000 ? "Lost" : "Won"}
      />

      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 && targetTime < 20 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Time is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
