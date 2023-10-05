"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditPlantForm({ id, name, family, genre, species, cultivar }) {
  const [newName, setNewName] = useState(name);
  const [newFamily, setNewFamily] = useState(family);
  const [newGenre, setNewGenre] = useState(genre);
  const [newSpecies, setNewSpecies] = useState(species);
  const [newCultivar, setNewCultivar] = useState(cultivar);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/plants/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newName, newFamily, newGenre, newSpecies, newCultivar }),
      });

      if (!res.ok) {
        throw new Error("Failed to update topic");
      }

      router.refresh();
      router.push("/settings");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-32 w-[500px]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
            onChange={(e) => setNewName(e.target.value)}
            value={newName}
            type="text"
            placeholder="Nom commun"
            className="input input-bordered w-full"
        />

        <input
            onChange={(e) => setNewFamily(e.target.value)}
            value={newFamily}
            type="text"
            placeholder="Famille"
            className="input input-bordered w-full"
        />

        <input
            onChange={(e) => setNewGenre(e.target.value)}
            value={newGenre}
            type="text"
            placeholder="Genre"
            className="input input-bordered w-full"
        />

        <input
            onChange={(e) => setNewSpecies(e.target.value)}
            value={newSpecies}
            type="text"
            placeholder="Espèce"
            className="input input-bordered w-full"
        />

        <input
            onChange={(e) => setNewCultivar(e.target.value)}
            value={newCultivar}
            type="text"
            placeholder="Cultivar"
            className="input input-bordered w-full"
        />

        <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit m-auto">
          Sauvegarder
        </button>
      </form>
    </div>
  );
}
