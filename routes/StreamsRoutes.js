import express from "express";
import AddStreamAsync from "../features/streams/add/AddStreamsHandler.js";
import GetStreamsAsync from "../features/streams/get/GetStreamsHandler.js";
import GetByIdStreamAsync from "../features/streams/get/GetByIdStreamsHandler.js";
import UpdateStreamsAsync from "../features/streams/update/UpdateStreamsHandler.js";
import DeleteStreamsAsync from "../features/streams/delete/DeleteStreamsHandler.js";

const router = express.Router();

router.post("/add", AddStreamAsync);
router.get("/get", GetStreamsAsync);
router.get("/getbyid/:id", GetByIdStreamAsync);
router.put("/update/:id", UpdateStreamsAsync);
router.delete("/delete/:id", DeleteStreamsAsync);

export default router;
