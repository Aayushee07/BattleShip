import { store } from './state/store';
import { setStrike, setStrikeResult } from './state/strike/strikeSlice';
import { selectShips } from './state/ship/shipSlice'; 
import { Ship } from './state/ship/shipSlice'; 
import { setSessionId } from './state/session/sessionSlice';

let socket: WebSocket;
let sessionId: string | null = null;
let playerId: string = '';



export const connectWebSocket = () => {
  socket = new WebSocket('ws://localhost:8080');

  socket.onopen = () => {
    console.log('WebSocket connection established');
  };

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    handleWebSocketMessage(message);
    console.log(message)
  };

  socket.onclose = () => {
    console.log('WebSocket connection closed');
  };
};

const handleWebSocketMessage = (message: any) => {
  switch (message.type) {
    case 'sessionCreated':
      sessionId = message.data.sessionId;
      store.dispatch(setSessionId(message.data.sessionId))
      playerId = message.data.playerId; 
      console.log(`Session created with ID: ${sessionId}, Player ID: ${playerId}`);
      break;
    case 'sessionJoined':
      sessionId = message.data.sessionId;
      playerId = message.data.playerId; 
      console.log(`Joined session with ID: ${sessionId}`);
      break;
    case 'sessionFull':
      console.log('Session is full');
      break;
    case 'strike':
      console.log(`Strike received at (${message.data.row}, ${message.data.col}) from player ${message.data.playerId}`);
      store.dispatch(setStrike(message.data));
      const state = store.getState();
      const ships = selectShips(state);
      const isHit = checkStrike(ships.ships, message.data.row, message.data.col);

      sendStrikeResult(isHit, message.data.row, message.data.col);
      break;
    case 'strikeResult':
      store.dispatch(setStrikeResult(message.data));
      break;
    default:
      console.log('Unknown message type:', message.type);
  }
};

const checkStrike = (ships: Ship[], row: number, col: number): boolean => {
  for (const ship of ships) {
    if (ship.position.some(pos => pos.row === row && pos.col === col)) {
      return true;
    }
  }
  return false;
};

const sendStrikeResult = (isHit: boolean, row: number, col: number) => {
  if (socket && socket.readyState === WebSocket.OPEN && sessionId) {
    const message = JSON.stringify({
      type: 'strikeResult',
      data: {
        sessionId,
        row,
        col,
        playerId,
        result: isHit ? 'hit' : 'miss'
      }
    });
    socket.send(message);
  }
};

export const createSession = () => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    const message = JSON.stringify({ type: 'createSession' });
    socket.send(message);
  }
};

export const joinSession = (sessionId: string, playerId: string) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    const message = JSON.stringify({ type: 'joinSession', data: { sessionId, playerId } });
    socket.send(message);
  }
};

export const sendStrike = (row: number, col: number,sessionId : string) => {
  if (socket && socket.readyState === WebSocket.OPEN && sessionId) {
    console.log(sessionId)
    const message = JSON.stringify({ type: 'strike', data: { sessionId, row, col, playerId } });
    socket.send(message);
  }
};

export default { connectWebSocket, createSession, joinSession, sendStrike };
