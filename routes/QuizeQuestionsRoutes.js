import express from "express";
import AddQuizeQuestionsAsync from "../features/quizze/quize-questions/add/AddQuizeQuestionsHandler.js";
import GetQuizeQuestionsAsync from "../features/quizze/quize-questions/get/GetQuizeQuestionsHandler.js";
import GetByIdQuizeQuestionAsync from "../features/quizze/quize-questions/get/GetByIdQuizeQuestionsHandler.js";
import DeleteQuizeQuestionsAsync from "../features/quizze/quize-questions/delete/DeleteQuizeQuestionsHandler.js";
import UpdateQuizeQuestionsAsync from "../features/quizze/quize-questions/update/UpdateQuizeQuestionsHandler.js";

const router = express.Router();

router.post("/add", AddQuizeQuestionsAsync);
router.get("/get", GetQuizeQuestionsAsync);
router.get("/getbyid/:id", GetByIdQuizeQuestionAsync);
router.put("/update/:id", UpdateQuizeQuestionsAsync);
router.delete("/delete/:id", DeleteQuizeQuestionsAsync);

export default router;