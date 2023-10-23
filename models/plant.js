import mongoose, { Schema } from "mongoose";
const plantSchema = new Schema(
  {
    name: [String], // Nom commun
    family: String, // Famille
    genre: String, // genre
    species: String, // espèce
    cultivar: String, // cultivar
    picture: String,
    group: String, // Groupe d'apprentissage
    imageUrl: [String]
  }
);

const Plant = mongoose.models.Plant || mongoose.model("Plant", plantSchema);

export default Plant;
