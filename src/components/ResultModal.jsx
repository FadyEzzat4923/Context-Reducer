/* eslint-disable react/prop-types */
import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
const ResultModal = forwardRef(function ResultModal(
  { targetTime, timeRemaining, onReset },
  ref
) {
  const dialog = useRef();
  const setLost = timeRemaining <= 0;
  const formattedRemainingTime = (timeRemaining / 1000).toFixed(2);
  const score = Math.round((1 - timeRemaining / (targetTime * 1000)) * 100);

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
      show() {
        dialog.current.show();
      },
    };
  });

  return createPortal(
    <dialog ref={dialog} className="result-modal" onClose={onReset}>
      {setLost && <h2>You Lost</h2>}
      {!setLost && <h2>Your Score: {score}</h2>}
      <p>
        The target time was <strong>{targetTime}</strong> second
        {targetTime > 1 ? "s" : ""}.
      </p>
      <p>
        You stopped the timer with{" "}
        <strong>
          {formattedRemainingTime} second{timeRemaining > 1000 ? "s" : ""} left.
        </strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});
export default ResultModal;
