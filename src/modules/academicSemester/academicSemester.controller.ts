import catchAsync from "../../utils/catchAsync";
import { AcademicServices } from "./academicSemester.service";
import SendResponse from "../../utils/sendResponse";
import status from "http-status";

//Create an academic semester
const createAcademicSemester = catchAsync(async (req, res, next) => {
  //Create data
  const result = await AcademicServices.createAcademicSemesterIntoDB(req.body);
  SendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Academic Semester Created Successfully",
    data: result,
  });
});

//Get All Academic semesters
const getAllAcademicSemester = catchAsync(async (req, res, next) => {
  const result = await AcademicServices.getSemesters();
  SendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Academic Semester Created Successfully",
    data: result,
  });
});

//  Get Academic semester by ID
const getAcademicSemester = catchAsync(async (req, res, next) => {
  const { semesterId } = req.params;
  const result = await AcademicServices.getSemester(semesterId);

  SendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Academic Semester By Id Successfully fetched",
    data: result,
  });
});

//Update Academic Semester Data
const updateAcademicSemester = catchAsync(async (req, res, next) => {
  const { semesterId } = req.params;

  const result = await AcademicServices.updateAcademicSemesterIntoDB(
    semesterId,
    req.body
  );
  SendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Academic Semester Updated Successfully",
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemester,
  getAcademicSemester,
  updateAcademicSemester,
};
