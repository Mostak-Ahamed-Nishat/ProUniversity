import { NextFunction, Request, RequestHandler, Response } from "express";
import { StudentServices } from "./student.service";
import status from "http-status";
import SendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

// Get all students
const getStudents: RequestHandler = catchAsync(async (req, res, next) => {
  console.log("Hitting the get all students!");
  const result = await StudentServices.getStudentsFromDB();

  SendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Students successfully fetched!",
    data: result,
  });
});

// Get student by id
const getStudentById: RequestHandler = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const result = await StudentServices.getStudentFromDB(studentId);

  SendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Student successfully fetched!",
    data: result,
  });
});

//Delete student by id
// Note: The function name is misleading; it should be renamed to getStudentById
const deleteStudentById: RequestHandler = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteStudentFromDB(studentId);

  SendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Student successfully Deleted",
    data: result,
  });
});

export const StudentController = {
  getStudents,
  getStudentById,
  deleteStudentById,
};
