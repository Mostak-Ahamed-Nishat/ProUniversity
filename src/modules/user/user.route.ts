import express from "express";
import { UserController } from "./user.controller";
import { createStudentValidationSchema } from "../students/student.validation";
import validateRequest from "../../middlewares/validateRequestMiddleware";
const router = express.Router();

router.post(
  "/create-student",
  validateRequest(createStudentValidationSchema),
  UserController.createStudent
);
router.post("/create-faculty", UserController.createFaculty);
router.post("/create-admin", UserController.createAdmin);

export const UsersRoutes = router;
