export type GuardianInterface = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type UserNameInterface = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type LocalGuardianInterface = {
  name: string;
  occupation: string;
  contact: string;
  address: string;
};

export interface StudentInterface {
  id: string;
  name: UserNameInterface;
  email: string;
  gender: "male" | "female";
  dateOfBirth: string;
  contactNumber: string;
  emergencyContactNo: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress: string;
  guardian: GuardianInterface;
  localGuardian: LocalGuardianInterface;
  profileImage?: string;
  isActive: "active" | "blocked";
}
