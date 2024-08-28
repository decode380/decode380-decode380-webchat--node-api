import dotenv from "dotenv";
import { AppServer } from "./server.js";

dotenv.config();
const server = new AppServer();