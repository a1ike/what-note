import { useCallback, useEffect, useRef, useState } from "react";
import pitchAnalyser from "pitch-analyser";
import "./App.css";
import "./components/Background/index.css";
import { Button } from "./components/Button";
import { Background } from "./components/Background";

export const App = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [currentNote, setCurrentNote] = useState("");

  function handleStart() {
    const analyser = new pitchAnalyser({
      callback: function (payload) {
        console.log(payload); // E.g. { frequency: 220, note: "A3" }
      },
    });
    analyser.initAnalyser().then(() => {
      // Start the analyser after initialisation
      analyser.startAnalyser();
    });
  }

  function handleStop() {
    alert("ПОШЕЛ ТЫ");
  }

  return (
    <>
      <Background />
      <div className="flex flex-col min-h-screen justify-center items-center p-10">
        <h1 className="text-white">What Note?</h1>
        <Button onClick={handleStart}>Как дела</Button>
        <Button onClick={handleStop}>STOP IT</Button>
      </div>
    </>
  );
};
