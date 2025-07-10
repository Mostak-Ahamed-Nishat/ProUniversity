import { TStudent } from "./student.interface";
import Student from "./student.model";

const createStudentIntoDB = async (studentData: TStudent) => {
  //create a new instance of the Student model
  const student = new Student(studentData);

  if (await student?.isUserExist(student.id)) {
    throw new Error("Student with this ID already exists");
  }

  //save the student instance to the database
  const result = await student.save();
  if (!result) {
    throw new Error("Failed to create student! Try again!");
  }

  return result;
};

const getStudentsFromDB = async () => {
  // const result = await Student.find();
  const result = await Student.aggregate([{ $match: { isDeleted: false } }]);
  return result;
};

const getStudentFromDB = async (id: string) => {
  const result = await Student.findOne({
    id,
  });

  if (!result) {
    throw new Error("Student not found");
  }

  return result;
};

const deleteStudentFromDB = async (id: string) => {
  if (!id) {
    throw new Error("Student ID is required !");
  }

  // Find the student by ID and update the isDeleted field to true
  const result = await Student.updateOne(
    {
      id,
    },
    { isDeleted: true }
  );

  if (!result) {
    throw new Error("Failed to delete student");
  }

  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getStudentsFromDB,
  getStudentFromDB,
  deleteStudentFromDB,
};
