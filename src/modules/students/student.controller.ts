import { Request, Response } from "express";
import { StudentServices } from "./student.service";

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
  } catch (error) {
    console.log(error);
  }
};

const getStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getStudentsFromDB();
    return res.status(200).json({
      success: true,
      message: "Get all student successfully",
      data: result,
    });
  } catch (error) {
    console.log("Failed to fetch all the students.");
  }
};

const getStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getStudentFromDB(studentId);
    return res.status(200).json({
      success: true,
      message: "Student successfully fetched",
      data: result,
    });
  } catch (error) {
    console.log("Failed to fetch the student.");
  }
};

export const StudentController = {
  createStudent,
  getStudents,
  getStudent,
};
