import mongoose, { Schema } from "mongoose";
const scoreSchema = new Schema(
  {
    user: String,
    pseudo: String,
    level: String,
    groups: String,
    // mode: String,
    points: Number,
    questions: [],
    correctAnwsers: [],
    incorrectAnwsers: [],
    createdTime: Date,
  }
);

const Score = mongoose.models.Score || mongoose.model("Score", scoreSchema);

export default Score;
