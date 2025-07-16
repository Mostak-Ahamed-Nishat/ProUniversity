import { Response, Request, NextFunction, RequestHandler } from "express";
import { UserServices } from "./user.service";
import { createStudentValidationSchema } from "../students/student.validation";
import catchAsync from "../../utils/catchAsync";

// Create a new student
const createStudent: RequestHandler = catchAsync(async (req, res, next) => {
  //Get the data from the body
  const { student: studentData, password } = req.body;

  //create student
  const result = await UserServices.createStudentIntoDB(password, studentData);
  res.status(200).json({
    success: true,
    message: "Student is created successfully",
    data: result,
  });
});

const createAdmin = (req: Request, res: Response) => {};
const createFaculty = (req: Request, res: Response) => {};

export const UserController = { createStudent, createAdmin, createFaculty };
