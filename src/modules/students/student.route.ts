import express from "express";
import { StudentController } from "./student.controller";
const router = express.Router();

router.post("/create-student", StudentController.createStudent);
router.get("/", StudentController.getStudents);
router.get("/:studentId", StudentController.getStudent);

export const StudentRoutes = router;
