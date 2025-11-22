import mongoose from "mongoose";
import { TStudent } from "./student.interface";
import Student from "./student.model";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";

const getStudentsFromDB = async () => {
  const result = await Student.find()
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  // const result = await Student.aggregate([{ $match: { isDeleted: false } }]);
  return result;
};

const getStudentFromDB = async (id: string) => {
  const result = await Student.findOne({
    id,
  })
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });

  if (!result) {
    throw new Error("Student not found");
  }

  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    if (!id) {
      throw new AppError(402, "Student ID is required !");
    }

    // Find the student by ID and update the isDeleted field to true
    const deleteStudent = await Student.findOneAndUpdate(
      {
        id,
      },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deleteStudent) {
      throw new AppError(502, "Failed to delete student");
    }

    const deletedUser = await User.findByIdAndUpdate(
      { id },
      { isDeleted: true },
      {
        new: true,
        session,
      }
    );

    if (!deletedUser) {
      throw new AppError(402, "Failed to delete user !!");
    }

    await session.commitTransaction();
    await session.endSession();

    return deleteStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(500, "Failed to delete User !");
  }
};

const updateStudentInDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length > 0) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length > 0) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length > 0) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  try {
    const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
      new: true,
      runValidators: true,
    });

    if (!result) {
      throw new Error("Student not found");
    }
    return result;
  } catch (error) {
    throw new AppError(500, "Failed to update student");
  }
};

export const StudentServices = {
  getStudentsFromDB,
  getStudentFromDB,
  deleteStudentFromDB,
  updateStudentInDB,
};
