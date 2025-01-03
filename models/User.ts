import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      //unique: false,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    resetToken: {
      type: String,
      required: false,
    },
    resetTokenExpiry: {
      type: String,
      required: false,
    },
    likes: {
      type: [
        {
          type: Schema.Types.Mixed, // Allows any type of data in the array
        },
      ],
      default: [], // Initialize as an empty array
      required: false,
    },
    password: { type: String, required: false },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
