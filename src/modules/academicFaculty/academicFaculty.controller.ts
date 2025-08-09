import { AcademicFacultyServices } from "./academicFaculty.service";
import catchAsync from "../../utils/catchAsync";
import SendResponse from "../../utils/sendResponse";
import status from "http-status";

//Create a New Academic Faculty
const createAcademicFaculty = catchAsync(async (req, res, next) => {
  const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(
    req.body
  );
  SendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Academic Faculty is created Successfully",
    data: result,
  });
});

//Get All The Academic Faculties
const getAllAcademicFaculties = catchAsync(async (req, res, next) => {
  const result = await AcademicFacultyServices.getAllAcademicFacultyFromDB();

  SendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Academic Faculty is Fetched Successfully",
    data: result,
  });
});

//Get Academic Faculty
const getAcademicFaculty = catchAsync(async (req, res, next) => {
  const { facultyId } = req.params;
  const result = await AcademicFacultyServices.getAcademicFacultyFromDB(
    facultyId
  );

  SendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Academic Faculty is Fetched Successfully",
    data: result,
  });
});

//Get Academic Faculty
const updateAcademicFaculty = catchAsync(async (req, res, next) => {
  const { facultyId } = req.params;
  const payload = req.body;
  const result = await AcademicFacultyServices.updateAcademicFaculty(
    facultyId,
    payload
  );

  SendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Academic Faculty is Updated Successfully",
    data: result,
  });
});

export const AcademicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getAcademicFaculty,
  updateAcademicFaculty,
};
