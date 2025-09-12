import { io } from "socket.io-client";

const socket = io("http://10.0.2.2:5001", {
  transports: ["websocket"],   // Force WebSocket transport
  autoConnect: true,           // Connect immediately when imported
  reconnection: true,          // Auto reconnect if connection drops
  reconnectionAttempts: 5,     // Retry max 5 times
  reconnectionDelay: 1000,     // Wait 1s between retries
});

// Debugging logs
socket.on("connect", () => {
  console.log("🟢 User socket connected:", socket.id);
});

socket.on("connect_error", (err) => {
  console.log("🔴 User socket error:", err.message);
});

socket.on("disconnect", (reason) => {
  console.log("🔴 User socket disconnected:", reason);
});

export default socket;








// import { io } from "socket.io-client";

// const socket = io("http://10.0.2.2:5001", {
//   transports: ["websocket"],
//   autoConnect: true,   // connects immediately
//   reconnection: true,  // auto-reconnect on network drop
// });

// export default socket;
