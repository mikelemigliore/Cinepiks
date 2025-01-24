import mongoose from "mongoose";

const connect = async () => {
  if (mongoose.connections[0].readyState) return;

  try {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
      throw new Error("MONGO_URL is not defined");
    }
    await mongoose.connect(mongoUrl);
    console.log("Mogno Connection success");
    
  } catch(error) {
    throw new Error("Error connecting to Mongoose")
  }
};


export default connect;