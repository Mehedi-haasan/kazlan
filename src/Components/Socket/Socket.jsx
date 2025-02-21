import { io } from "socket.io-client";
import BaseUrl from "../../Constant";
const socket = io(`${BaseUrl}`);
export default socket;

