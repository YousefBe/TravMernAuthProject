import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    const DB = process.env.MONGO_URI.replace(
      "<PASSWORD>",
      process.env.DB_PASSWORD
    ).replace("<USERNAME>", process.env.DB_USER);
    mongoose.connect(DB).then((con) => {
      console.log("Connected to database on Host : " + con.connection.host);
    });
  } catch (error) {
    console.log(`Error : ${error.message}`);
    process.exit(1);
  }
};

export default connectToDB;
