import express from "express";
import AddQuestionOptionsAsync from "../features/quizze/question-options/add/AddQuestionOptionsHandler.js";
import GetQuestionOptionsAsync from "../features/quizze/question-options/get/GetQuestionOptionsHandler.js";
import GetByIdQuestionOptionAsync from "../features/quizze/question-options/get/GetByIdQuestionOptionsHandler.js";
import DeleteQuestionOptionsAsync from "../features/quizze/question-options/delete/DeleteQuestionOptionsHandler.js";
import UpdateQuestionOptionsAsync from "../features/quizze/question-options/update/UpdateQuestionOptionsHandler.js";

const router = express.Router();

router.post("/add", AddQuestionOptionsAsync);
router.get("/get", GetQuestionOptionsAsync);
router.get("/getbyid/:id", GetByIdQuestionOptionAsync);
router.put("/update/:id", UpdateQuestionOptionsAsync);
router.delete("/delete/:id", DeleteQuestionOptionsAsync);

export default router;