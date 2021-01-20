import { useEffect, useState } from "react";
import styled from 'styled-components';
import useTimer from './hooks/useTimer';

function App() {
  const [counter, setCounter] = useState(null);
  const { initiateTimer, runTimer, serverRunning, serverSpeed} = useTimer();
  const [speed, setSpeed] = useState(!serverSpeed ? "10" : null);

  useEffect(() => {
    initiateTimer((err, timestamp) => {
      setCounter(timestamp.description)
    })
  }, [])

  useEffect(() => {
    runTimer(speed);     
  }, [speed])

  useEffect(() => {
    serverSpeed && setSpeed(serverSpeed)
  }, [serverSpeed])

  return (
    <Wrapper>
      <h1> NodeJS Homework Challenge </h1>
      <h2>{counter}</h2>
      <Slider>
        Slower
        <input
          type="range" 
          min="1" 
          max="20" 
          value={speed} 
          onChange={(e) => setSpeed(e.target.value)}
        />
        Faster
      </Slider>
      <button onClick={() => serverRunning ? runTimer("0") : runTimer(speed)}>
        <Stop running={serverRunning}>{serverRunning ? "STOP" : "START"}</Stop>
      </button>
      Try moving the slider to change the counter speed.
    </Wrapper>
  );
}

const Slider = styled.span`
  display: flex;
  justify-content: center;
`;

const Stop = styled.div`
  display: grid;
  place-items: center;
  color: white;
 
  background: ${props => props.running ? "red" : "green"};
  height: 50px;
  width: 50px;
  clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
`;

const Wrapper = styled.div`
  display: grid;
  place-items: center;
  height: 60vh;
  min-height: 600px;
  max-width: 700px;
  margin: auto;
  padding: 0.5rem;
  text-align: center;
  box-shadow: 5px 5px 15px 1px #000000;
`;

export default App;
