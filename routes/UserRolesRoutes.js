import express from "express";
import AddUserRoleAsync from "../features/user-roles/add/AddUserRolesHandler.js";
import GetUserRolesAsync from "../features/user-roles/get/GetUserRolesHandler.js";
import GetByIdUserRolesAsync from "../features/user-roles/get/GetByIdUserRolesHandler.js";
import UpdateUserRoleAsync from "../features/user-roles/update/UpdateUserRolesHandler.js";
import DeleteUserRoleAsync from "../features/user-roles/delete/DeleteUserRolesHandler.js";

const router = express.Router();

router.post("/add", AddUserRoleAsync);
router.get("/get", GetUserRolesAsync);
router.get("/getbyid/:id", GetByIdUserRolesAsync);
router.put("/update/:id", UpdateUserRoleAsync);
router.delete("/delete/:id", DeleteUserRoleAsync);

export default router;
