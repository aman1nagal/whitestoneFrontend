import { io } from "socket.io-client";

// Initialize a socket connection
const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL); // Make sure to set this in your environment file

export default socket;
