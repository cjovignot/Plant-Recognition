import mongoose, { Schema } from "mongoose";

const plantSchema = new Schema(
  {
    title: String,
    description: String,
    family: String
  }
);

const Plant = mongoose.models.Plant || mongoose.model("Plant", plantSchema);

export default Plant;
