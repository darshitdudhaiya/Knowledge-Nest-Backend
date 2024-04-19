import express from "express";
import AddVideoAttachmentAsync from "../features/video-attachments/add/AddVideoAttachmentHandler.js";
import GetVideoAttachmentAsync from "../features/video-attachments/get/GetVideoAttchmentHandler.js";
import GetByVideoIdVideoAttachmentsAsync from "../features/video-attachments/get/GetByVideoIdVideoAttachmentHandler.js";
import DeleteVideoAttachmentAsync from "../features/video-attachments/delete/DeleteVideoAttchmentsHandler.js";

const router = express.Router();

router.post("/add/:id", AddVideoAttachmentAsync);
router.get("/get", GetVideoAttachmentAsync);
router.get("/getby-videoid/:id", GetByVideoIdVideoAttachmentsAsync);
router.delete("/delete/:id", DeleteVideoAttachmentAsync);

export default router;
