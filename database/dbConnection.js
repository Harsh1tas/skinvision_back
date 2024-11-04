import mongoose from "mongoose";

export const dbConnection = () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error("Error: MONGO_URI is not defined in the environment variables.");
    process.exit(1); // Exit the process if no URI is provided
  }

  mongoose.connect(uri, {
    dbName: "MERN_STACK_HOSPITAL_MANAGEMENT_SYSTEM",
    useNewUrlParser: true,        // Recommended for stable connection parsing
    useUnifiedTopology: true,     // Ensures use of the new connection management engine
  })
  .then(() => {
    console.log("Connected to the database successfully!");
  })
  .catch((err) => {
    console.error("An error occurred while connecting to the database:", err.message);
    process.exit(1); // Exit the process on connection failure
  });
};
