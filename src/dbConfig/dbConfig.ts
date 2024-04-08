import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!); // ! mark to tell ts that this is not null or undefined, to make sure it is present.
    const connection = mongoose.connection.on("connected", () => {
      console.log("MongoDB connected");
    });
    mongoose.connection.on("error", (err) => {
      console.log("MongoDB Connection failed: " + err);
      process.exit();
    });
    console.log("Connected to DB");
  } catch (error) {
    console.log("Something went wrong at connecting to DB");
    console.log(error);
  }
}
