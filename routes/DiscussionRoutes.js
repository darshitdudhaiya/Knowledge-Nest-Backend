import express from "express";
import AddDiscussionAsync from "../features/discussions/add/AddDiscussionHandler.js";
import GetDiscussionAsync from "../features/discussions/get/GetDiscussionHandler.js";
import GetByIdDiscussionAsync from "../features/discussions/get/GetByIdDiscussionHandler.js";
import DeleteDiscussionAsync from "../features/discussions/delete/DeleteDiscussionHandler.js";
import UpdateDiscussionAsync from "../features/discussions/update/UpdateDiscussionHandler.js";

const router = express.Router();

router.post("/add", AddDiscussionAsync);
router.get("/get", GetDiscussionAsync);
router.get("/getbyid/:id", GetByIdDiscussionAsync);
router.put("/update/:id", UpdateDiscussionAsync);
router.delete("/delete/:id", DeleteDiscussionAsync);

export default router;