import express, { NextFunction, Request, Response } from "express";
import { AcademicSemesterControllers } from "./academicSemester.controller";
import validateRequest from "../../middlewares/validateRequestMiddleware";
import { AcademicSemesterValidationSchema } from "./academicSemester.validation";
const router = express.Router();

router.post(
  "/",
  validateRequest(AcademicSemesterValidationSchema.CreateSemester),
  AcademicSemesterControllers.createAcademicSemester
);
// router.get("/:studentId", AcademicSemesterController.getStudentById);
// router.delete("/:studentId", AcademicSemesterController.deleteStudentById);

export const StudentRoutes = router;
