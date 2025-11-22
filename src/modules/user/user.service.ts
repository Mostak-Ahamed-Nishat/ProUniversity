import mongoose from "mongoose";
import config from "../../config";
import AppError from "../../errors/AppError";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../students/student.interface";
import Student from "../students/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";
import status from "http-status";

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  //create a user object
  let userData: Partial<TUser> = {};
  userData.role = "student";

  //if password is not give, use default password
  userData.password = password || config.default_password;

  //Find the academic semester details by the id
  const admissionSemesterData = await AcademicSemester.findById(
    payload.admissionSemester
  );

  if (!admissionSemesterData) {
    throw new AppError(404, "Admission semester not found");
  }

  //Student transaction and role back
  const session = await mongoose.startSession();

  try {
    //Start the transaction session
    session.startTransaction();

    //Set auto generated id
    userData.id = await generateStudentId(admissionSemesterData);

    //create user (transaction-1)
    const newUser = await User.create([userData], { session });

    //create a student
    if (!newUser.length) {
      throw new AppError(status.BAD_GATEWAY, "Failed to create user");
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    //create student (transaction-2)
    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(status.BAD_GATEWAY, "Failed to create student");
    }
    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(status.BAD_GATEWAY, "Failed to create student");
  }
};

export const UserServices = {
  createStudentIntoDB,
};
