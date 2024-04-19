import express from "express";
import AddDiscussionRecords from "../features/discussion-records/add/AddDiscussionRecords.js"
import GetDiscussionRecordsAsync from "../features/discussion-records/get/GetDiscussionRecordsHandler.js";
import GetByIdDiscussionRecords from "../features/discussion-records/get/GetByIdDiscussionRecordHandler.js";
import DeleteDiscussionRecords from "../features/discussion-records/delete/DeleteDiscussionRecordsHandler.js";
import UpdateDiscussionRecords from "../features/discussion-records/update/UpdateDiscussionRecordsHandler.js";

const router = express.Router();

router.post("/add", AddDiscussionRecords);
router.get("/get", GetDiscussionRecordsAsync);
router.get("/getbyid/:id", GetByIdDiscussionRecords);
router.put("/update/:id", UpdateDiscussionRecords);
router.delete("/delete/:id", DeleteDiscussionRecords);

export default router;