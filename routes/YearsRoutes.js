import express from "express";
import AddYearsAsync from "../features/years/add/AddYearsHandler.js";
import GetYearsAsync from "../features/years/get/GetYearsHandler.js";
import GetByIdYearAsync from "../features/years/get/GetByIdYearsHandler.js";
import UpdateYearsAsync from "../features/years/update/UpdateYearsHandler.js";
import DeleteYearsAsnc from "../features/years/delete/DeleteYearsHandler.js";

const router = express.Router();

router.post("/add", AddYearsAsync);
router.get("/get", GetYearsAsync);
router.get("/getbyid/:id", GetByIdYearAsync);
router.put("/update/:id", UpdateYearsAsync);
router.delete("/delete/:id", DeleteYearsAsnc);


export default router;
