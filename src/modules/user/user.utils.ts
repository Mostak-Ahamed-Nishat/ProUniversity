import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: "student",
    },
    {
      id: 1,
      _id: 0,
    }
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  //Get the full Id first then compare
  return lastStudent?.id ? lastStudent.id : undefined;
};

//Generate used id by adding +1 with the last user id
// Year +->Semester +->4 digits number
export const generateStudentId = async (payload: TAcademicSemester) => {
  //For the first time it will be 0000 from next will be +1
  let currentId = (0).toString(); //0000
  const lastStudentId = await findLastStudentId(); //2025020001
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6); //02
  const lastStudentYear = lastStudentId?.substring(0, 4); //2025
  const currentSemesterCode = payload.code;
  const currentYear = payload.year;

  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentYear === currentYear
  ) {
    currentId = lastStudentId.substring(6);
  }

  let numericId = (Number(currentId) + 1).toString().padStart(4, "0");
  let incrementId = `${payload.year}${payload.code}${numericId}`;
  console.log("Incremented ID: ", incrementId);
  return incrementId.toString();
};
