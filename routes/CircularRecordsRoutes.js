import express from "express";
import AddCircularRecords from "../features/circular-records/add/AddCircularRecord.js";
import GetCircularRecords from "../features/circular-records/get/GetCircularRecordsHandler.js";
import GetByIdGetCircularRecords from "../features/circular-records/get/GetByIdCircularRecordHandler.js";
import DeleteCircularRecords from "../features/circular-records/delete/DeleteCircularRecordHandler.js";
import UpdateCircularRecords from "../features/circular-records/update/UpdateCircularRecordHandler.js";

const router = express.Router();

router.post("/add", AddCircularRecords);
router.get("/get", GetCircularRecords);
router.get("/getbyid/:id", GetByIdGetCircularRecords);
router.put("/update/:id", UpdateCircularRecords);
router.delete("/delete/:id", DeleteCircularRecords);

export default router;