import express from "express";
import AddVideoAsync from "../features/videos/add/AddVideoHandler.js";
import UpdateVideoFileAsync from "../features/videos/update/UpdateVideoFileHandler.js";
import UpdateThumbnailAsync from "../features/videos/update/UpdateVideoThumbnailHandler.js";
import GetVideoAsync from "../features/videos/get/GetVideoHandler.js";
import GetVideoByIdAsync from "../features/videos/get/GetVideoByIdHandler.js";
import UpdateVideoAsync from "../features/videos/update/UpdateVideoHandler.js";
import DeleteVideoAsync from "../features/videos/delete/DeleteVideoHandler.js";

const router = express.Router();

router.post("/add", AddVideoAsync);
router.post("/video-file/:id", UpdateVideoFileAsync);
router.post("/video-thumbnail/:id", UpdateThumbnailAsync);
router.get("/get", GetVideoAsync);
router.get("/getbyid/:id", GetVideoByIdAsync);
router.put("/update/:id", UpdateVideoAsync);
router.delete("/delete/:id", DeleteVideoAsync);

export default router;
