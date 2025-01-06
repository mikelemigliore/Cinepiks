import mongoose from "mongoose";

const { Schema } = mongoose;

// Subschema for a single address object

const likesSchema = new mongoose.Schema({

  id: Number,

  type: String,

});

const watchlistSchema = new mongoose.Schema({

  id: Number,

  type: String,

});


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
      type: [likesSchema],
      default: [],    // Initialize as an empty array
      required: false // Indicates this field is optional
    },
    watchlist: {
      type: [watchlistSchema],
      default: [], // Initialize as an empty array
      required: false,
    },
    password: { type: String, required: false },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
