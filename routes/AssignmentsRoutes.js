import express from "express";
import AddAssignmentsAsync from "../features/assignments/add/AddAssignmentsHandler.js";
import GetAssignmentsAsync from "../features/assignments/get/GetAssignmentsHandler.js";
import GetByIdAssignmentAsync from "../features/assignments/get/GetByIdAssignmentHandler.js";
import DeleteAssignmentsAsync from "../features/assignments/delete/DeleteAssignmentsHandler.js";
import UpdateAssignmentsAsync from "../features/assignments/update/UpdateAssignmentsHandler.js";

const router = express.Router();

router.post("/add",AddAssignmentsAsync)
router.get("/get",GetAssignmentsAsync);
router.get("/getbyid/:id",GetByIdAssignmentAsync)
router.delete("/delete/:id",DeleteAssignmentsAsync)
router.put("/update/:id",UpdateAssignmentsAsync)

export default router;