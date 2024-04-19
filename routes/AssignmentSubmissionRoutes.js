import express from "express";
import AddAssignmentSubmissionAsync from "../features/assignment-submissions/add/AddAssignmentSubmissionHandler.js";
import GetAssignmentSubmissionAsync from "../features/assignment-submissions/get/GetAssignmentSubmissionHandler.js";
import GetByAssignmentIdAssignmentSubmissionAsync from "../features/assignment-submissions/get/GetByAssignmentIdAssignmentSubmission.js";
import DeleteAssignmentSubmissionAsync from "../features/assignment-submissions/delete/DeleteAssignmentSubmission.js";

const router = express.Router();

router.post("/add/:id", AddAssignmentSubmissionAsync);
router.get("/get", GetAssignmentSubmissionAsync);
router.get("/getby-assignmentid/:id", GetByAssignmentIdAssignmentSubmissionAsync);
router.delete("/delete/:id", DeleteAssignmentSubmissionAsync);



export default router;
