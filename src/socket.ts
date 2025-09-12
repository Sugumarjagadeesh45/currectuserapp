// D:\newapp\userapp-main 2\userapp-main\src\socket.ts
import { io } from "socket.io-client";
import { getBackendUrl } from "./util/backendConfig";

const socket = io(getBackendUrl(), {
  transports: ["websocket"],
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  timeout: 10000,
});

socket.on("connect", () => {
  console.log("🟢 User socket connected to:", getBackendUrl());
});

socket.on("connect_error", (err) => {
  console.log("🔴 User socket error:", err.message);
});

socket.on("disconnect", () => {
  console.log("🔴 User socket disconnected. Attempting to reconnect...");
});

socket.on("reconnect_failed", () => {
  console.log("🔴 User socket reconnection failed");
});

export default socket;






// import { io } from "socket.io-client";
// const socket = io("http://10.0.2.2:5001", {
//   transports: ["websocket"],   // Force WebSocket transport
//   autoConnect: true,           // Connect immediately when imported
//   reconnection: true,          // Auto reconnect if connection drops
//   reconnectionAttempts: 5,     // Retry max 5 times
//   reconnectionDelay: 1000,     // Wait 1s between retries
// });

// // Debugging logs
// socket.on("connect", () => {
//   console.log("🟢 User socket connected:", socket.id);
// });

// socket.on("connect_error", (err) => {
//   console.log("🔴 User socket error:", err.message);
// });

// socket.on("disconnect", (reason) => {
//   console.log("🔴 User socket disconnected:", reason);
// });

// export default socket;
