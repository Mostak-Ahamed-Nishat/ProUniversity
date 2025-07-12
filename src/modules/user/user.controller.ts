import { Response, Request } from "express";
import { UserServices } from "./user.service";
import { createStudentValidationSchema } from "../students/student.validation";

// Create a new student
const createStudent = async (req: Request, res: Response) => {
  try {
    //Get the data from the body
    const { student: studentData, password } = req.body;

    //Validate the data
    // const zodParsedData = createStudentValidationSchema.parse(studentData);

    //create student
    const result = await UserServices.createStudentIntoDB(
      password,
      studentData
    );

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

const createAdmin = (req: Request, res: Response) => {};
const createFaculty = (req: Request, res: Response) => {};

export const UserController = { createStudent, createAdmin, createFaculty };
