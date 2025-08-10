import catchAsync from "../../utils/catchAsync";
import SendResponse from "../../utils/sendResponse";
import status from "http-status";
import { AcademicDepartmentServices } from "./academicDepartment.service";

//Create a New Academic Faculty
const createAcademicDepartment = catchAsync(async (req, res, next) => {
  const result =
    await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body);
  SendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Academic Department is created Successfully",
    data: result,
  });
});

//Get All The Academic Faculties
const getAllAcademicDepartment = catchAsync(async (req, res, next) => {
  const result =
    await AcademicDepartmentServices.getAllAcademicDepartmentFromDB();

  SendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Academic Department is Fetched Successfully",
    data: result,
  });
});

//Get Academic Faculty
const getAcademicDepartment = catchAsync(async (req, res, next) => {
  const { departmentId } = req.params;
  const result = await AcademicDepartmentServices.getAcademicDepartmentFromDB(
    departmentId
  );

  SendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Academic Department is Fetched Successfully",
    data: result,
  });
});

//Get Academic Faculty
const updateAcademicDepartment = catchAsync(async (req, res, next) => {
  const { departmentId } = req.params;
  const payload = req.body;
  const result = await AcademicDepartmentServices.updateAcademicDepartment(
    departmentId,
    payload
  );
  SendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Academic Department is Updated Successfully",
    data: result,
  });
});

export const AcademicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getAcademicDepartment,
  updateAcademicDepartment,
};
