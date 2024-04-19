import express from "express";
import AddQuizzesAsync from "../features/quizze/quizzes/add/AddQuizzesHandler.js";
import GetQuizzesAsync from "../features/quizze/quizzes/get/GetQuizzesHandler.js";
import GetByIdQuizzeAsync from "../features/quizze/quizzes/get/GetByIdQuizzeHandler.js";
import DeleteQuizzesAsync from "../features/quizze/quizzes/delete/DeleteQuizzesHandler.js";
import UpdateQuizzesAsync from "../features/quizze/quizzes/update/UpdateQuizzesHandler.js";

const router = express.Router();

router.post("/add", AddQuizzesAsync);
router.get("/get", GetQuizzesAsync);
router.get("/getbyid/:id", GetByIdQuizzeAsync);
router.put("/update/:id", UpdateQuizzesAsync);
router.delete("/delete/:id", DeleteQuizzesAsync);

export default router;