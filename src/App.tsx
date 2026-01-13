import { useEffect, useRef, useState } from "react";

type GameState = "varakozas" | "ready" | "result";

export default function ReflexJatek() {
  const [state, setState] = useState<GameState>("varakozas");
  
  const [reactionTime, setReactionTime] = useState<number | null>(null);

  const timerRef = useRef<number | null>(null);

  const indulIdo = useRef<number>(0);

  useEffect(() => {
    startGame();
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const startGame = () => {
    setState("varakozas");
    setReactionTime(null);

    const randomIdo = Math.floor(Math.random() * 3000) + 1000; 

    timerRef.current = window.setTimeout(() => {
      indulIdo.current = performance.now();
      setState("ready");
    }, randomIdo);
  };

 
  const handleClick = () => {
    if (state === "ready") {
      const vegIdo = performance.now();
      setReactionTime(Math.round(vegIdo - indulIdo.current));
      setState("result");
    }
  };

  
 

  return (
    <div id="lenyeg"
      onClick={handleClick}
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: state === "ready" ? "pointer" : "default",
        backgroundColor:
          state === "varakozas"
            ? "yellow"
            : state === "ready"
            ? "green"
            : "lightblue",
      }}
    >
      {state === "varakozas" && (
        <h1>Várj a zöld képernyőre!</h1>
      )}

      {state === "ready" && (
        <h1>KATTINTS!</h1>
      )}

      {state === "result" && (
        <div style={{ textAlign: "center" }}>
          <h1>A te időd:</h1>
          <h2>{reactionTime} ms</h2>
          <button
            onClick={startGame}
           
          >
            Új teszt
          </button>
        </div>
      )}
    </div>
  );
}

