import mongoose from "mongoose";

const connDB = async () => {
  try {
    const con = await mongoose.connect(process.env.DATABASE);
    console.log("connecteed successfuly to the database");
  } catch (e) {
    e;
  }
};
export default connDB;
