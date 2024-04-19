import express from "express";
import AddQuizeSubmissionsAsync from "../features/quize-submission/quize-submissions/add/AddQuizeSubmissionsHandler.js";
import GetQuizeSubmissionsAsync from "../features/quize-submission/quize-submissions/get/GetQuizeSubmissionsHandler.js";
import GetByIdQuizeSubmissionsAsync from "../features/quize-submission/quize-submissions/get/GetByIdQuizeSubmissionsHandler.js";
import DeleteQuizeSubmissionsAsync from "../features/quize-submission/quize-submissions/delete/DeleteQuizeSubmissionsHandler.js";
import UpdateQuizeSubmissionsAsync from "../features/quize-submission/quize-submissions/update/UpdateQuizeSubmissionsHandler.js";

const router = express.Router();

router.post("/add", AddQuizeSubmissionsAsync);
router.get("/get", GetQuizeSubmissionsAsync);
router.get("/getbyid/:id", GetByIdQuizeSubmissionsAsync);
router.put("/update/:id", UpdateQuizeSubmissionsAsync);
router.delete("/delete/:id", DeleteQuizeSubmissionsAsync);

export default router;