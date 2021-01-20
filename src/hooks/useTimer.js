import socketIOClient from "socket.io-client";
const socket = socketIOClient("/")

function useTimer(callback) {

  const initiateTimer = (callback) => {
    socket.on('counterConnect', data => callback(null, data))
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

  const superFastTimer = () => {
    socket.send("superfast")
  }

  

  return { initiateTimer, startTimer, stopTimer, speedUpTimer, superFastTimer}
}

export default useTimer