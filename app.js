import express from "express"; 
import dbConnection from "./config/db.js";
import { config } from "dotenv"; 
import cookieParser from "cookie-parser"; 
import cors from "cors"; 
import fileUpload from "express-fileupload"; 
import { errorMiddleware } from "./middlewares/error.js"; 
import messageRouter from "./router/messageRouter.js"; 
import userRouter from "./router/userRouter.js"; 
import appointmentRouter from "./router/appointmentRouter.js"; 

// Load environment variables from config file
config({ path: "./config.env" }); 

// Initialize Express app
const app = express(); 

// Configure CORS
app.use(cors({ 
  origin: [process.env.FRONTEND_URL_ONE, process.env.FRONTEND_URL_TWO], 
  methods: ["GET", "POST", "DELETE", "PUT"], 
  credentials: true 
})); 

// Middleware setup
app.use(cookieParser()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(fileUpload({ 
  useTempFiles: true, 
  tempFileDir: "/tmp/" 
})); 

// Route setup
app.use("/api/v1/message", messageRouter); 
app.use("/api/v1/user", userRouter); 
app.use("/api/v1/appointment", appointmentRouter); 

// New endpoint
app.get("/api/some-endpoint", async (req, res) => { 
  try { 
    const data = await someAsyncFunction(); 
    res.status(200).json({ success: true, data }); 
  } catch (error) { 
    console.error(error); // Log the error for debugging 
    res.status(500).json({ success: false, message: "Internal Server Error" }); 
  } 
});

// Root route
app.get("/", (req, res) => { 
  res.json("Hello"); 
}); 

// Database connection
dbConnection(); 

// Error handling middleware
app.use(errorMiddleware); 

export default app; 
