import mongoose from "mongoose";

export const connectDB = async () => {
  const url = `mongodb+srv://azizcodes:${process.env.MONGODB_PASSWORD}@cluster0.ch5ydcm.mongodb.net/codebook`;
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
