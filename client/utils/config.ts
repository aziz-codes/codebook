import mongoose from "mongoose";

export const connectDB = async () => {
  let url = "";
  try {
    mongoose.connect(url);
    mongoose.connection.on("connected", () => {
      console.log("connected to mongodb");
    });
    mongoose.connection.on("error", () => {
      console.log("Error connecting to Database");
      throw new Error("Connection Error");
    });
  } catch (err) {
    console.log(err);
  }
};
