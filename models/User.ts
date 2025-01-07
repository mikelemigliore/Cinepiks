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

const watchedSchema = new mongoose.Schema({
  id: Number,

  type: String,
});

// New score schema directly under the user, one score per movie
const scoreSchema = new mongoose.Schema({
  id: Number,
  type: String,
  score: Number,
});

// const episodeSchema = new mongoose.Schema({
//   episodeNumber: Number,
// });

const seasonSchema = new mongoose.Schema({
  seriesId: Number,
  seasonNumber: Number,
  episodes: [Number], // Embedding the episode schema as an array
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
      default: [], // Initialize as an empty array
      required: false, // Indicates this field is optional
    },
    watchlist: {
      type: [watchlistSchema],
      default: [], // Initialize as an empty array
      required: false,
    },
    watched: {
      type: [watchedSchema],
      default: [], // Initialize as an empty array
      required: false,
    },
    score: {
      type: [scoreSchema],
      default: [], // Initialize as an empty array
      required: false,
    },
    season: {
      type: [seasonSchema],
      default: [], // Initialize as an empty array
      required: false,
    },
    password: { type: String, required: false },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
