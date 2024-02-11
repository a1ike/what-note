import { useCallback, useEffect, useRef, useState } from "react";
import pitchAnalyser from "pitch-analyser";
import "./App.css";
import "./components/Background/index.css";
import { Button } from "./components/Button";
import { Background } from "./components/Background";

export const App = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [currentNote, setCurrentNote] = useState("");

  const analyser = new pitchAnalyser({
    callback: function (payload) {
      console.log(payload); // E.g. { frequency: 220, note: "A3" }
      setCurrentNote(payload.note);
      setIsRecording(true);
    },
  });

  function handleStart() {
    analyser.initAnalyser().then(() => {
      // Start the analyser after initialisation
      analyser.startAnalyser();
    });
  }

  function handlePause() {
    analyser.initAnalyser().then(() => {
      // Start the analyser after initialisation
      analyser.pauseAnalyser();
      setIsRecording(false);
    });
  }

  return (
    <>
      <Background />
      <div className="flex flex-col min-h-screen justify-center items-center p-10">
        <h1 className="mb-8 text-white text-6xl font-bold">What Note?</h1>
        <div>
          <Button onClick={handleStart}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 inline"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
              />
            </svg>
            Recognize
          </Button>
          <Button onClick={handlePause}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 inline"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
            </svg>
            Pause
          </Button>
        </div>
        <h2 className="mt-6 text-white text-4xl">
          {!isRecording && `Press the "RECOGNIZE" button`}
          {isRecording && `Looks like it's a "`}
          <span className="font-bold">{currentNote}</span>
          {`" note`}
        </h2>
      </div>
    </>
  );
};
