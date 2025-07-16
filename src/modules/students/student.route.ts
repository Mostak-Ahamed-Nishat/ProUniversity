import express, { NextFunction, Request, Response } from "express";
import { StudentController } from "./student.controller";
const router = express.Router();

router.get("/", StudentController.getStudents);
router.get("/:studentId", StudentController.getStudentById);
router.delete("/:studentId", StudentController.deleteStudentById);

export const StudentRoutes = router;
