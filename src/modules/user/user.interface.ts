export type TUser = {
  id: string;
  password: string;
  needPasswordChange: Boolean;
  role: "admin" | "student" | "faculty";
  status: "in-progress" | "blocked";
  isDeleted: Boolean;
};
