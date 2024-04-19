import express from "express";
import AddSubjectAsync from "../features/subjects/add/AddSubjectsHandler.js";
import GetSubjectsAsync from "../features/subjects/get/GetSubjectsHandler.js";
import GetByIdSubjectAsync from "../features/subjects/get/GetByIdSubjectsHandler.js";
import UpdateSubjectsAsync from "../features/subjects/update/UpdateSubjectsHandler.js";
import DeleteSubjectsAsync from "../features/subjects/delete/DeleteSubjectsHandler.js";

const router = express.Router();

router.post("/add", AddSubjectAsync);
router.get("/get", GetSubjectsAsync);
router.get("/getbyid/:id", GetByIdSubjectAsync);
router.put("/update/:id", UpdateSubjectsAsync);
router.delete("/delete/:id", DeleteSubjectsAsync);

export default router;
