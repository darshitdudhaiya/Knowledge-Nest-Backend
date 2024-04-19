import express from "express";
import AddAttachmentTypesAsync from "../features/attachment-types/add/AddAttachmentTypesHandler.js";
import GetAttachmentTypesAsync from "../features/attachment-types/get/GetAttachmentTypesHandler.js";
import GetByIdAttachmentTypesAsync from "../features/attachment-types/get/GetByIdAttachmentTypesHandler.js";
import DeleteAttachmentTypesAsync from "../features/attachment-types/delete/DeleteAttachmentTypesHandler.js";
import UpdateAttachmentTypesAsync from "../features/attachment-types/update/UpdateAttachmentTypesHandler.js";

const router = express.Router();

router.post("/add",AddAttachmentTypesAsync)
router.get("/get",GetAttachmentTypesAsync);
router.get("/getbyid/:id",GetByIdAttachmentTypesAsync)
router.delete("/delete/:id",DeleteAttachmentTypesAsync)
router.put("/update/:id",UpdateAttachmentTypesAsync)

export default router;