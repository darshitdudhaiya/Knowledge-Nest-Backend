import express from "express";
import AddQuizeSubmissionRecordsAsync from "../features/quize-submission/quize-submission-records/add/AddQuizeSubmissionRecordsHandler.js";
import GetQuizeSubmissionRecordsAsync from "../features/quize-submission/quize-submission-records/get/GetQuizeSubmissionRecordsHandler.js";
import GetByIdQuizeSubmissionRecordAsync from "../features/quize-submission/quize-submission-records/get/GetByIdQuizeSubmissionRecordsHandler.js";
import DeleteQuizeSubmissionRecordsAsync from "../features/quize-submission/quize-submission-records/delete/DeleteQuizeSubmissionRecordsHandler.js";
import UpdateQuizeSubmissionRecordsAsync from "../features/quize-submission/quize-submission-records/update/UpdateQuizeSubmissionRecordsHandler.js";

const router = express.Router();

router.post("/add", AddQuizeSubmissionRecordsAsync);
router.get("/get", GetQuizeSubmissionRecordsAsync);
router.get("/getbyid/:id", GetByIdQuizeSubmissionRecordAsync);
router.put("/update/:id", UpdateQuizeSubmissionRecordsAsync);
router.delete("/delete/:id", DeleteQuizeSubmissionRecordsAsync);

export default router;