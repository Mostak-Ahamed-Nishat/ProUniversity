import { NextFunction, Request, Response } from "express";
import { StudentServices } from "./student.service";

// Get all students
const getStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await StudentServices.getStudentsFromDB();
    return res.status(200).json({
      success: true,
      message: "Get all student successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

// Get student by id
const getStudentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getStudentFromDB(studentId);

    return res.status(200).json({
      success: true,
      message: "Student successfully fetched",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

//Delete student by id
// Note: The function name is misleading; it should be renamed to getStudentById
const deleteStudentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);

    return res.status(200).json({
      success: true,
      message: "Student successfully Deleted",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

export const StudentController = {
  getStudents,
  getStudentById,
  deleteStudentById,
};
