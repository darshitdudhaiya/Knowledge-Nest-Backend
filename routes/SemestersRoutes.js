import express from "express";
import AddSemestersAsync from "../features/semesters/add/AddSemestersHandler.js";
import GetSemestersAsync from "../features/semesters/get/GetSemestersHandler.js";
import UpdateSemestersAsync from "../features/semesters/update/UpdateSemestersHandler.js";
import DeleteSemestersAsync from "../features/semesters/delete/DeleteSemestersHandler.js";
import GetByIdSemesterAsync from "../features/semesters/get/GetByIdSemestersHandler.js";

const router = express.Router();

router.post("/add", AddSemestersAsync);
router.get("/get", GetSemestersAsync);
router.get("/getbyid/:id", GetByIdSemesterAsync);
router.put("/update/:id", UpdateSemestersAsync);
router.delete("/delete/:id", DeleteSemestersAsync);


export default router;
