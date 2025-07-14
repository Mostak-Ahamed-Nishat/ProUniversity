import { NextFunction, Request, Response } from "express";
import { StudentServices } from "./student.service";
import status from "http-status";
import SendResponse from "../../utils/sendResponse";

// Get all students
const getStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await StudentServices.getStudentsFromDB();

    return SendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Students successfully fetched!",
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

    return SendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Student successfully fetched!",
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

    return SendResponse(res, {
      statusCode: status.OK,
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
