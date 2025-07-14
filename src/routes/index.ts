import { Router } from "express";
import { StudentRoutes } from "../modules/students/student.route";
import { UsersRoutes } from "../modules/user/user.route";
const router = Router();

const moduleRoutes = [
  {
    path: "/students",
    route: StudentRoutes,
  },
  {
    path: "/users",
    route: UsersRoutes,
  },
];

moduleRoutes.map((route) => router.use(route.path, route.route));

export default router;
