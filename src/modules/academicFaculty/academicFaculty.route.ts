import express from "express";
import validateRequest from "../../middlewares/validateRequestMiddleware";
import { AcademicFacultyValidation } from "./academicFaculty.validations";
import { AcademicFacultyController } from "./academicFaculty.controller";
const router = express.Router();

router.post(
  "/create-academic-faculty",
  validateRequest(AcademicFacultyValidation.create),
  AcademicFacultyController.createAcademicFaculty
);

router.get("/", AcademicFacultyController.getAllAcademicFaculties);

router.get("/:facultyId", AcademicFacultyController.getAcademicFaculty);

router.patch(
  "/:facultyId",
  validateRequest(AcademicFacultyValidation.update),
  AcademicFacultyController.updateAcademicFaculty
);

export const AcademicFacultyRoutes = router;
