import config from "../../config";
import { TStudent } from "../students/student.interface";
import Student from "../students/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  //create a user object
  let userData: Partial<TUser> = {};
  userData.role = "student";

  //if password is not give, use default password
  userData.password = password || config.default_password;

  //Set auto generated id(manually)
  userData.id = "2030100001";

  //create user
  const newUser = await User.create(userData);

  //create a student
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id;

    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};

// !Previous code
// import { TStudent } from "../students/student.interface";
// import Student from "../students/student.model";
// import { User } from "./user.model";

// const createStudentIntoDB = async (password: string, studentData: TStudent) => {
//   //Is the user already exist by the id

//   // if (await Student.isUserExist(studentData.id)) {
//   //   throw new Error("User already exists !");
//   // }

//   const result = await User.create(studentData);
//   return result;
//   //create a new instance of the Student model
//   // const student = new Student(studentData);

//   // if (await student?.isUserExist(student.id)) {
//   //   throw new Error("Student with this ID already exists");
//   // }

//   // //save the student instance to the database
//   // const result = await student.save();
//   // if (!result) {
//   //   throw new Error("Failed to create student! Try again!");
//   // }

//   return result;
// };

// export const UserServices = {
//   createStudentIntoDB,
// };
