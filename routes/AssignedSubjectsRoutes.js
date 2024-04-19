import express from "express";
import AddAssignedSubjectsAsync from "../features/assigned-subjects/add/AddAssignedSubjectsHandler.js";
import GetAssignedSubjectsAsync from "../features/assigned-subjects/get/GetAssignedSubjectsHandler.js";
import GetByIdSemesterAsync from "../features/assigned-subjects/get/GetByIdAssignedSubjectsHandler.js";
import UpdateAssignedSubjectsAsync from "../features/assigned-subjects/update/UpdateAssignedSubjectsHandler.js";
import DeleteAssignedSubjectsAsync from "../features/assigned-subjects/delete/DeleteAssignedSubjectsHandler.js";
import GetByFacultyIdAssignedSubjectsAsync from "../features/assigned-subjects/get/GerByFacultyIdAssignedSubjectsHandler.js";

const router = express.Router();

router.post("/add", AddAssignedSubjectsAsync);
router.get("/get", GetAssignedSubjectsAsync);
router.get("/getbyid/:id", GetByIdSemesterAsync);
router.get("/getbyfacultyid/:id", GetByFacultyIdAssignedSubjectsAsync);
router.put("/update/:id", UpdateAssignedSubjectsAsync);
router.delete("/delete/:id", DeleteAssignedSubjectsAsync);


export default router;
