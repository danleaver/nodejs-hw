import {useState, useEffect} from 'react';
import socketIOClient from "socket.io-client";
const socket = socketIOClient("/")

function useTimer(callback) {
  const [serverRunning, setServerRunning] = useState(true);
  const [serverSpeed, setServerSpeed] = useState(null);

  useEffect(() => {
    socket.on('runningStatus', data => setServerRunning(data.running))
    socket.on('speed', data => setServerSpeed(data.speed))
  }, [])

  const initiateTimer = (callback) => {
    socket.on('counterConnect', data => callback(null, data))
  }

  
  const runTimer = (speed) => {
    socket.send(speed)
  }


  return { initiateTimer, runTimer, serverRunning, serverSpeed}
}

export default useTimer