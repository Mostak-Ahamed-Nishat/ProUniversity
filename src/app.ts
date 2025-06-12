import express, { Application, Request, Response } from "express";
import cors from "cors";
import { StudentRoutes } from "./modules/students/student.route";

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
app.use("/api/v1/students", StudentRoutes);

// Handle Not Found Route
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
    errorMessages: [
      {
        path: req.path,
        message: "API Not Found",
      },
    ],
  });
});

export default app;
