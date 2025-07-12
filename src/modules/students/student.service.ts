import { TStudent } from "./student.interface";
import Student from "./student.model";

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
  getStudentsFromDB,
  getStudentFromDB,
  deleteStudentFromDB,
};
