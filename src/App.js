import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

function useTimer(cb) {
  // socket.on('newclientconnectaa', data => cb(null, data))
  

  const initiateTimer = (cb) => {
    socket.on('newclientconnectaa', data => cb(null, data))
  }

  const startTimer = () => {
    socket.send("start")
  }

  const stopTimer = () => {
    socket.send("stop")
  }

  const speedUpTimer = () => {
    socket.send("speedup")
  }

  return { initiateTimer, startTimer, stopTimer, speedUpTimer}
}

const socket = socketIOClient("/")

function App() {
  const value = useRef(null)
  const [counter, setCounter] = useState(0);
  const { initiateTimer, startTimer, stopTimer, speedUpTimer } = useTimer();

  initiateTimer((err, timestamp) => {
    setCounter(timestamp.description)
  })


  return (
    <div>
      hello
      {/* <button onClick={handleClick}>Start Count</button> */}
      <button onClick={startTimer}>Start Count</button>
      <button onClick={stopTimer}>Stop Count</button>
      <button onClick={speedUpTimer}>Speed Up</button>
      {/* {Date.now()} */}
      <h1>{counter}</h1>
      {/* { value.current } */}
      {/* {value && <DisplayValue value={value}/> } */}
    </div>
  );
}



// function useInterval(callback, delay) {
//   const savedCallback = useRef();

//   // Remember the latest callback.
//   useEffect(() => {
//     savedCallback.current = callback;
//   }, [callback]);

//   // Set up the interval.
//   useEffect(() => {
//     let id = setInterval(() => {
//       savedCallback.current();
//     }, delay);
//     return () => clearInterval(id);
//   }, [delay]);
// }





const DisplayValue = (props) => {
  return (
    <div>
      {props.value.current}
    </div>
  )

}

export default App;
