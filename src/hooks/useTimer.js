import socketIOClient from "socket.io-client";
const socket = socketIOClient("/")

function useTimer(callback) {

  const initiateTimer = (callback) => {
    socket.on('counterConnect', data => callback(null, data))
  }

  const runTimer = (speed) => {
    socket.send(speed)
  }


  return { initiateTimer, runTimer}
}

export default useTimer