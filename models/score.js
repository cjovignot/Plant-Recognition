import mongoose, { Schema } from "mongoose";
const scoreSchema = new Schema(
  {
    pseudo: String,
    level: String,
    groups: String,
    questions: [],
    correctAnwsers: [],
    incorrectAnwsers: [],
    createdTime: Date,
  }
);

const Score = mongoose.models.Score || mongoose.model("Score", scoreSchema);

export default Score;
