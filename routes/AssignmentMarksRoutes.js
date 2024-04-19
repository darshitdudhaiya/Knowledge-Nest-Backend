import express from "express";
import AddAssignmentMarksAsync from "../features/assignment-marks/add/AddAssignmentMarksHandler.js";
import GetAssignmentMarksAsync from "../features/assignment-marks/get/GetAssignmentMarksHandler.js";
import GetByIdAssignmentMarksHandler from "../features/assignment-marks/get/GetByIdAssignmentMarksHandler.js";
import UpdateAssignmentMarksAsync from "../features/assignment-marks/update/UpdateAssignmentMarksHandler.js";
import DeleteAssignmentMarksAsync from "../features/assignment-marks/delete/DeleteAssignmentMarksHandler.js";

const router = express.Router();

router.post("/add", AddAssignmentMarksAsync);
router.get("/get", GetAssignmentMarksAsync);
router.get("/getbyid/:id", GetByIdAssignmentMarksHandler);
router.put("/update/:id", UpdateAssignmentMarksAsync);
router.delete("/delete/:id", DeleteAssignmentMarksAsync);

export default router;
