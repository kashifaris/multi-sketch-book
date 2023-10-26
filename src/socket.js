import { io } from "socket.io-client";
const URL = process.env.NODE_ENV === 'production' ? 'https://sketch-book-server-cbp7.onrender.com' : "http://localhost:8000"
export const socket = io(URL);