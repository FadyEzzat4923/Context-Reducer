import { useState, useRef } from "react";
export default function Player() {
  const [playerName, setPlayerName] = useState("");
  const player = useRef();
  // If I not use useRef must use all of these codes
  // const [oldName, setOldName] = useState("Unknown Entity");
  // const [validChange, setValidChange] = useState();
  // function handlePlayerName(event) {
  //   // setValidChange(false);
  //   setPlayerName(event.target.value);
  // }
  function changing() {
    // setValidChange(true);
    // setOldName(playerName);
    setPlayerName(player.current.value);
    player.current.value = "";
  }
  return (
    <section id="player">
      <h2>Welcome {playerName ? playerName : "Unknown Entity"}</h2>
      <p>
        <input
          ref={player}
          type="text"
          placeholder="Player Name"
          // onChange={handlePlayerName}
          // value={playerName}
        />
        <button onClick={changing}>Set Name</button>
      </p>
    </section>
  );
}
