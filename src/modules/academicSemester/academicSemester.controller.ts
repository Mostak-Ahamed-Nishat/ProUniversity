import { AcademicSemester } from "./academicSemester.model";
import catchAsync from "../../utils/catchAsync";
import { AcademicServices } from "./academicSemester.service";
import SendResponse from "../../utils/sendResponse";
import status from "http-status";

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

export const AcademicSemesterControllers = {
  createAcademicSemester,
};
