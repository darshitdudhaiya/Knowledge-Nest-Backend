import express from "express";
import AddClassesAsync from "../features/classes/add/AddClassesHandler.js";
import GetClassesAsync from "../features/classes/get/GetClassesHandler.js";
import GetByIdClassAsync from "../features/classes/get/GetByIdClassesHandler.js";
import DeleteClassesAsync from "../features/classes/delete/DeleteClassesHandler.js";
import UpdateClassesAsync from "../features/classes/update/UpdateClassesHandler.js";

const router = express.Router();

router.post("/add", AddClassesAsync);
router.get("/get", GetClassesAsync);
router.get("/getbyid/:id", GetByIdClassAsync);
router.put("/update/:id", UpdateClassesAsync);
router.delete("/delete/:id", DeleteClassesAsync);

export default router;