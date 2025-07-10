import { Request, Response } from "express";
import { StudentServices } from "./student.service";

// Create a new student
const createStudent = async (req: Request, res: Response) => {
  try {
    const { student } = req.body;
    //create student
    const result = await StudentServices.createStudentIntoDB(student);

    res.status(200).json({
      success: true,
      message: "Student is created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Student creation failed",
    });
  }
};

// Get all students
const getStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getStudentsFromDB();
    return res.status(200).json({
      success: true,
      message: "Get all student successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetched students",
    });
  }
};

// Get student by id
const getStudentById = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getStudentFromDB(studentId);

    return res.status(200).json({
      success: true,
      message: "Student successfully fetched",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetched student by id",
    });
  }
};

//Delete student by id
// Note: The function name is misleading; it should be renamed to getStudentById
const deleteStudentById = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);

    return res.status(200).json({
      success: true,
      message: "Student successfully Deleted",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetched student by id",
    });
  }
};

export const StudentController = {
  createStudent,
  getStudents,
  getStudentById,
  deleteStudentById,
};
