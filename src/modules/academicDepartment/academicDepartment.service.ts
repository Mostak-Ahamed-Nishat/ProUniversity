import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  if (result) return result;
  else
    throw new Error(
      "Failed to create Academic Department. Something went wrong"
    );
};

const getAllAcademicDepartmentFromDB = async () => {
  const result = await AcademicDepartment.find();
  if (result) return result;
  else
    throw new Error(
      "Something went wrong! Failed to get All the Academic Department"
    );
};

const getAcademicDepartmentFromDB = async (id: string) => {
  const result = await AcademicDepartment.findById(id);
  if (result) return result;
  else
    throw new Error(
      "Something went wrong! Failed to get the Academic Department"
    );
};

const updateAcademicDepartment = async (
  id: string,
  payload: TAcademicDepartment
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
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
    throw new Error(
      "Something went wrong! Failed to update Academic Department"
    );
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentFromDB,
  getAcademicDepartmentFromDB,
  updateAcademicDepartment,
};
