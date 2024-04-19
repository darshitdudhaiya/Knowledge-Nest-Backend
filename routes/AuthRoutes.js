import express from "express";
import login from "../features/auth/login/LoginHandler.js";

const authRouter = express.Router();

authRouter.post("/login", login);

export default authRouter;
