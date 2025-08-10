import express from "express";
import validateRequest from "../../middlewares/validateRequestMiddleware";
import { AcademicDepartmentValidation } from "./academicDepartment.validations";
import { AcademicDepartmentController } from "./academicDepartment.controller";
const router = express.Router();

router.post(
  "/create-academic-department",
  validateRequest(AcademicDepartmentValidation.create),
  AcademicDepartmentController.createAcademicDepartment
);

router.get("/", AcademicDepartmentController.getAllAcademicDepartment);

router.get(
  "/:departmentId",
  AcademicDepartmentController.getAcademicDepartment
);

router.patch(
  "/:departmentId",
  validateRequest(AcademicDepartmentValidation.update),
  AcademicDepartmentController.updateAcademicDepartment
);

export const AcademicDepartmentRoutes = router;
