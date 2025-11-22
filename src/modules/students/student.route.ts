import express, { NextFunction, Request, Response } from "express";
import { StudentController } from "./student.controller";
import validateRequest from "../../middlewares/validateRequestMiddleware";
import { updateStudentValidationSchema } from "./student.validation";
const router = express.Router();

router.get("/", StudentController.getStudents);
router.get("/:studentId", StudentController.getStudentById);
router.delete("/:studentId", StudentController.deleteStudentById);
router.patch(
  "/:studentId",
  validateRequest(updateStudentValidationSchema),
  StudentController.updateStudentById
);

export const StudentRoutes = router;
