import { TAcademicSemester } from "../academicSemester/academicSemester.interface";

//Generate used id by adding +1 with the last user id
// Year +->Semester +->4 digits number
export const generateStudentId = (payload: TAcademicSemester) => {
  //For the first time it will be 0000 from next will be +1
  const currentId = (0).toString();
  let numericId = (Number(currentId) + 1).toString().padStart(4, "0");
  let incrementId = `${payload.year}${payload.code}${numericId}`;
  console.log("Incremented ID: ", incrementId);
  return incrementId.toString();
};
