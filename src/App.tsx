import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

interface TimeObj {
  hours: number,
  minutes: number,
  seconds: number
}

declare global {
  interface Window { myInt: any; }
}

function App() {

  const [currentTime, setCurrentTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const updateTime = () => {
    const time: Date = new Date();
  const adjustedHours = time.getHours() > 12 ? time.getHours() : time.getHours() - 12;
  let TO: TimeObj = {
    hours: adjustedHours,
    minutes: time.getMinutes(),
    seconds: time.getSeconds()
  }
  setCurrentTime(TO);
  }

  useEffect(() => {
    updateTime();
    window.myInt = undefined;
  }, [])

  const timeInt = () => {
    if (window.myInt === undefined) {
      window.myInt = setInterval(() => {
        updateTime();
      }, 1000)
    }
  }

  timeInt();

  return (
    <div className="App">
    <div id="clock">
        <div id="hourHand" style={{
        transform: `rotate(${(30 * currentTime.hours) + ((Math.floor(currentTime.minutes / 12)) * 6)}deg)`
      }}></div>
      <div id="minuteHand" style={{
        transform: `rotate(${6 * currentTime.minutes}deg)`
      }}></div>
    <div id="secondHand" style={{
        transform: `rotate(${6 * currentTime.seconds}deg)`
      }}></div>
      <div id="nobContainer">
      <div id="nob"></div>
      </div>
      <img src="clockNumbers.png" id="clockNumbers" alt="Clock Numbers" />
    </div>
    </div>
  );
}

export default App;
