import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

function incrementFooBy(delta) {
  return (previousState, currentProps) => {
      return delta;
  };
}

function App() {
  const socket = socketIOClient("/")
  const value = useRef(null)
  const [counter, setCounter] = useState(0);


  // useInterval(() => {
  //   setCounter(counter + 1)
  // }, 1000)


  useEffect(() => {
    socket.on("newclientconnectaa", data => {
      // console.log(data.description)
      // console.log("value", value.current)
      value.current = data.description
      setCounter(incrementFooBy(data.description))
      // setCounter(data.description)
    });

    return () => socket.disconnect();
  }, [])


  console.log("here", value.current)
  const handleClick = () => {
    socket.send("start") 
  }

  const handleClick2 = () => {
    socket.send("stop") 
  }

  const handleClick3 = () => {
    socket.send("speedup") 
  }

  return (
    <div>
      hello
      <button onClick={handleClick}>Start Count</button>
      <button onClick={handleClick2}>Stop Count</button>
      <button onClick={handleClick3}>Speed Up</button>
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
