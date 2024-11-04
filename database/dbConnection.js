import mongoose from "mongoose";

export const dbConnection = () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error("Error: MONGO_URI is not defined in the environment variables.");
    process.exit(1);
  }

  mongoose.connect(uri, {
    dbName: "MERN_STACK_HOSPITAL_MANAGEMENT_SYSTEM",
  })
  .then(() => {
    console.log("Connected to the database successfully!");
  })
  .catch((err) => {
    console.error("An error occurred while connecting to the database:", err.message);
    process.exit(1); // Exit the process on connection failure
  });
};
