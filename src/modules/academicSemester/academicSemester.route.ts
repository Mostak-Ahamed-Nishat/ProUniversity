import express from "express";
import { AcademicSemesterControllers } from "./academicSemester.controller";
import validateRequest from "../../middlewares/validateRequestMiddleware";
import { AcademicSemesterValidationSchema } from "./academicSemester.validation";
const router = express.Router();

//create Semester
router.post(
  "/create-semester",
  validateRequest(AcademicSemesterValidationSchema.CreateSemester),
  AcademicSemesterControllers.createAcademicSemester
);

router.get(
  "/get-semesters",
  AcademicSemesterControllers.getAllAcademicSemester
);

router.get(
  "/get-semester/:semesterId",
  AcademicSemesterControllers.getAcademicSemester
);

router.put(
  "/update-semester/:semesterId",
  validateRequest(AcademicSemesterValidationSchema.UpdateSemester),
  AcademicSemesterControllers.updateAcademicSemester
);

export const AcademicSemesterRoutes = router;
