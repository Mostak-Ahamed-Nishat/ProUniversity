import {
  TAcademicSemester,
  TAcademicSemesterNameCodeMapper,
} from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  // Map Type | semester name and code should be same correct !
  const academicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
    Autumn: "01",
    Summer: "02",
    Fall: "03",
  };

  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error("Semester code or name invalid");
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

const getSemesters = async () => {
  const result = await AcademicSemester.find();
  return result;
};

const getSemester = async (id: string) => {
  const result = await AcademicSemester.findOne({ id });
  if (!result) {
    throw new Error("Semester with given ID not found");
  }
  return result;
};

const updateAcademicSemesterIntoDB = async (
  semesterId: string,
  payload: Partial<TAcademicSemester>
) => {
  // Map: semester name and code should match
  const academicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
    Autumn: "01",
    Summer: "02",
    Fall: "03",
  };

  // Only validate if both name and code are provided
  if (payload.name && payload.code) {
    if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
      throw new Error("Semester code or name invalid");
    }
  }

  const result = await AcademicSemester.findByIdAndUpdate(
    { _id: semesterId },
    payload,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!result) {
    throw new Error("Semester with given ID not found");
  }

  return result;
};
export const AcademicServices = {
  createAcademicSemesterIntoDB,
  updateAcademicSemesterIntoDB,
  getSemesters,
  getSemester,
};
