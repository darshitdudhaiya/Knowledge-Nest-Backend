import express from "express";
import AddCircularsAsync from "../features/circulars/add/AddCircularHandler.js";
import GetCircularsAsync from "../features/circulars/get/GetCircularsHandler.js";
import GetByIdGetCircularsAsync from "../features/circulars/get/GetByIdCircularsHandler.js";
import DeleteCircularsAsync from "../features/circulars/delete/DeleteCircularsHandler.js";
import UpdateCircularsAsync from "../features/circulars/update/UpdateCircularHandler.js";

const router = express.Router();

router.post("/add", AddCircularsAsync);
router.get("/get", GetCircularsAsync);
router.get("/getbyid/:id", GetByIdGetCircularsAsync);
router.put("/update/:id", UpdateCircularsAsync);
router.delete("/delete/:id", DeleteCircularsAsync);

export default router;