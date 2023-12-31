import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';

export default function ProgressBar() {
    const [progress, setProgress] = useState(0);
    const [running, setRunning] = useState(false);
  
    useEffect(() => {
      let interval;
  
      if (running) {
        interval = setInterval(() => {
          if (progress < 100) {
            setProgress((prevProgress) => prevProgress + 5);
          } else {
            clearInterval(interval);
            setRunning(false);
          }
        }, 500);
      }
  
      return () => clearInterval(interval);
    }, [progress, running]);
  
    const handleStart = () => {
      setRunning(true);
    };
  
    const handleStop = () => {
      setRunning(false);
    };
  
    const handleReset = () => {
      setProgress(0);
      setRunning(false);
    };
  
    return (
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }}>
          {progress}%
        </div>
        <div className="progress-bar-text">
          {running ? 'Loading' : progress === 100 ? 'Complete' : 'Paused'}
        </div>
        <div className="progress-bar-buttons">
          <button onClick={handleStart} disabled={running}>
            Start
          </button>
          <button onClick={handleStop} disabled={!running}>
            Stop
          </button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
    );
  }