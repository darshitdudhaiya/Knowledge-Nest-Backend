import express from "express";
import addUser from "../features/users/add/AddUserHandler.js";
import getUsers from "../features/users/get/GetUsersHandler.js";
import getUserById from "../features/users/get/GetUserByIdHandler.js";
import deleteUser from "../features/users/delete/DeleteUserHandler.js";
import updateUser from "../features/users/update/UpdateUserHandler.js";
import getUsersByUserRole from "../features/users/get/GetUsersByUserRoleHandler.js";
import updateProfilePicture from "../features/users/update/UpdateProfilePictureHandler.js";

const router = express.Router();

router.post("/add/:userrole", addUser);
router.get("/get", getUsers);
router.get("/getbyid/:id", getUserById);
router.get("/getbyuserrole/:userrole", getUsersByUserRole);
router.put("/update/:id", updateUser);
router.put("/updateprofilepicture/:id", updateProfilePicture);
router.delete("/delete/:id", deleteUser);

export default router;
