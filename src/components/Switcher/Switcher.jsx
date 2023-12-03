import { useState } from "react";
import "./Switcher.css";

function Switcher(props) {
  const [switchState, setSwitchState] = useState(true);
  const [onBtnClass, setOnBtnClass] = useState("on-state");
  const [offBtnClass, setOffBtnClass] = useState("off-state");
  let currentOnBtn = "onBtn";

  return (
    <div className="switcher-container">
      <h3 id="switcher-header">What we have:</h3>
      <div className="switcher-button-container">
        <button
          className={onBtnClass + " switch-btn on-btn"}
          onClick={() => {
            setOnBtnClass("on-state");
            setOffBtnClass("off-state");
          }}
        >
          {props.onText}
        </button>
        <button
          className={offBtnClass + " switch-btn off-btn"}
          onClick={() => {
            setOnBtnClass("off-state");
            setOffBtnClass("on-state");
          }}
        >
          {props.offText}
        </button>
      </div>
    </div>
  );
}

export default Switcher;
