import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  if (result) return result;
  else
    throw new Error("Failed to create Academic Faculty. Something went wrong");
};

const getAllAcademicFacultyFromDB = async () => {
  const result = await AcademicFaculty.find();
  if (result) return result;
  else
    throw new Error(
      "Something went wrong! Failed to get All the Academic Faculties"
    );
};

const getAcademicFacultyFromDB = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  if (result) return result;
  else
    throw new Error("Something went wrong! Failed to get the Academic Faculty");
};

const updateAcademicFaculty = async (id: string, payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.findOneAndUpdate(
    {
      _id: id,
    },
    payload,
    {
      new: true,
    }
  );
  if (result) return result;
  else
    throw new Error("Something went wrong! Failed to update Academic Faculty");
};

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultyFromDB,
  getAcademicFacultyFromDB,
  updateAcademicFaculty,
};
