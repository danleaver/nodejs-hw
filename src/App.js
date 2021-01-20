import { useEffect, useRef, useState } from "react";
import styled from 'styled-components';
import useTimer from './hooks/useTimer';

import './App.css'
function App() {
  const [counter, setCounter] = useState(null);
  const { initiateTimer, startTimer, stopTimer, speedUpTimer, superFastTimer } = useTimer();
  const [speed, setSpeed] = useState("2");

  useEffect(() => {
    initiateTimer((err, timestamp) => {
      setCounter(timestamp.description)
    })
  }, [])

  useEffect(() => {
    switch (speed) {
      case "0": 
        stopTimer();
      break;
      case "1": 
        startTimer();
      break;
      case "2": 
        console.log("here")
        speedUpTimer();
      break;
      case "3": 
        superFastTimer();
      break;
      default: 
        stopTimer();
    }    
  }, [speed])

  return (
    <Wrapper>
      <h1> NodeJS Homework Challenge </h1>
      <h2>{counter}</h2>
      <Slider>
        Stop
        <input
          type="range" 
          min="0" 
          max="3" 
          value={speed} 
          onChange={(e) => setSpeed(e.target.value)}
        />
        Faster
      </Slider>
      Try moving the slider to change the counter speed.
    </Wrapper>
  );
}
const Slider = styled.span`
  display: flex;
  justify-content: center;
`
const Wrapper = styled.div`
  display: grid;
  place-items: center;
  height: 50vh;
  text-align: center;
`

export default App;
