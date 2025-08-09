import config from "../../config";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../students/student.interface";
import Student from "../students/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";

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
    throw new Error("Admission semester not found");
  }

  //Set auto generated id
  userData.id = await generateStudentId(admissionSemesterData);

  //create user
  const newUser = await User.create(userData);

  //create a student
  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    payload.user = newUser._id;

    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
