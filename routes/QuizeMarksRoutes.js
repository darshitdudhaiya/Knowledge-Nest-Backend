import express from "express";
import AddQuizeMarksAsync from "../features/quize-submission/quize-marks/add/AddQuizeMarksHandler.js";
import GetQuizeMarksAsync from "../features/quize-submission/quize-marks/get/GetQuizeMarksHandler.js";
import GetByIdQuizeMarksAsync from "../features/quize-submission/quize-marks/get/GetByIdQuizeMarksHandler.js";
import DeleteQuizeMarksAsync from "../features/quize-submission/quize-marks/delete/DeleteQuizeMarksHandler.js";
import UpdateQuizeMarksAsync from "../features/quize-submission/quize-marks/update/UpdateQuizeMarksHandler.js";

const router = express.Router();

router.post("/add", AddQuizeMarksAsync);
router.get("/get", GetQuizeMarksAsync);
router.get("/getbyid/:id", GetByIdQuizeMarksAsync);
router.put("/update/:id", UpdateQuizeMarksAsync);
router.delete("/delete/:id", DeleteQuizeMarksAsync);

export default router;