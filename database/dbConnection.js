import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";

import dbConnection from "./database/dbConnection.js"; // Import your database connection
import { errorMiddleware } from "./middlewares/error.js";
import messageRouter from "./router/messageRouter.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";

// Load environment variables from config file
config({ path: "./config.env" });

// Initialize Express app
const app = express();

// Configure CORS
app.use(
  cors({
    origin: [process.env.FRONTEND_URL_ONE, process.env.FRONTEND_URL_TWO],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

// Middleware setup
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Initialize Database Connection
dbConnection(); // Call this function to connect to MongoDB

// Route setup
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);

// Root route
app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Hello World",
  });
});

// Error handling middleware
app.use(errorMiddleware);

export default app;
