"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Testing route
app.get("/", (req, res) => {
    res.send("Welcome to ProUniversity Management System!");
});
// Handle Not Found Route
app.use((req, res) => {
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
exports.default = app;
