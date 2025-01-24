import mongoose from "mongoose";

const { Schema } = mongoose;

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

const scoreSchema = new mongoose.Schema({
  id: Number,
  type: String,
  score: Number,
});

const episodeSchema = new mongoose.Schema({
  episodeNumber: Number,
  episodeWatched: Boolean,
});

const seasonSchema = new mongoose.Schema({
  seriesId: Number,
  seasonNumber: Number,
  episodes: [episodeSchema], 
});

const userSchema = new Schema(
  {
    username: {
      type: String,
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
      default: [], 
      required: false, 
    },
    watchlist: {
      type: [watchlistSchema],
      default: [], 
      required: false,
    },
    watched: {
      type: [watchedSchema],
      default: [],
      required: false,
    },
    score: {
      type: [scoreSchema],
      default: [],
      required: false,
    },
    season: {
      type: [seasonSchema],
      default: [], 
      required: false,
    },
    picture: {
      type: String,
      required: false,
      default: ""
    },
    password: { type: String, required: false },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
