import express from "express";
import AddAssignmentAttachmentAsync from "../features/assignment-attachments/add/AddAssignmentAttachmentHandler.js";
import GetAssignmentAttachmentAsync from "../features/assignment-attachments/get/GetAssignmentAttachmentHandler.js";
import GetByIdAssignmentAttachmentAsync from "../features/assignment-attachments/get/GetByAssignmentIdAssignmentAttachmentHandler.js";
import DeleteAssignmentAttachmentAsync from "../features/assignment-attachments/delete/DeleteAssignmentAttachmentHandler.js";

const router = express.Router();

router.post("/add/:id", AddAssignmentAttachmentAsync);
router.get("/get", GetAssignmentAttachmentAsync);
router.get("/getby-assignmentid/:id", GetByIdAssignmentAttachmentAsync);
router.delete("/delete/:id", DeleteAssignmentAttachmentAsync);

export default router;
