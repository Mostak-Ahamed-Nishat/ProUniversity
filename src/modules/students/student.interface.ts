import { Model } from "mongoose";

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export interface TStudent {
  id: string;
  password: string;
  name: TUserName;
  email: string;
  gender: "male" | "female";
  dateOfBirth: string;
  contactNumber: string;
  emergencyContactNo: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress: string;
  guardian: TLocalGuardian;
  localGuardian: TLocalGuardian;
  profileImage?: string;
  isActive: "active" | "blocked";
  isDeleted: boolean;
}

//Custom instance method for check is the user already exists
export type TStudentMethods = {
  isUserExist(id: string): Promise<TStudent | null>;
};

export type TStudentModel = Model<TStudent, {}, TStudentMethods>;
