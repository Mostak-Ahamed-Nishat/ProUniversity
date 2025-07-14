import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { StudentRoutes } from "./modules/students/student.route";
import { UsersRoutes } from "./modules/user/user.route";
import globalErrorHandler from "./middlewares/globalErrorMiddleware";
import notFoundErrorHandler from "./middlewares/notFoundErrorMiddleware";
import router from "./routes";

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Testing route
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to ProUniversity Management System!");
});

//Applications Routes
app.use("/api/v1", router);

// Handle Not Found Route
app.use(notFoundErrorHandler);

//Error Handler
app.use(globalErrorHandler);

export default app;
