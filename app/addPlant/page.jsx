"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddPlant() {
  const [name, setName] = useState("");
  const [family, setFamily] = useState("");
  const [genre, setGenre] = useState("")
  const [species, setSpecies] = useState("")
  const [cultivar, setCultivar] = useState("")

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !family || !genre || !species || !cultivar) {
      alert("Name and family are required.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/plants", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name, family, genre, species, cultivar }),
    });
    console.log("body:", res.body)

      if (res.ok) {
        router.push("/settings");
      } else {
        throw new Error("Failed to create a plant");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-32">
      <div className="w-96 m-auto">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Nom commun"
              className="input input-bordered w-full max-w-xs"
          />

          <input
              onChange={(e) => setFamily(e.target.value)}
              value={family}
              type="text"
              placeholder="Famille"
              className="input input-bordered w-full max-w-xs"
          />

          <input
              onChange={(e) => setGenre(e.target.value)}
              value={genre}
              type="text"
              placeholder="Genre"
              className="input input-bordered w-full max-w-xs"
          />

          <input
              onChange={(e) => setSpecies(e.target.value)}
              value={species}
              type="text"
              placeholder="Espèce"
              className="input input-bordered w-full max-w-xs"
          />

          <input
              onChange={(e) => setCultivar(e.target.value)}
              value={cultivar}
              type="text"
              placeholder="Cultivar"
              className="input input-bordered w-full max-w-xs"
          />

          <button
              type="submit"
              className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
          >
              Ajouter
          </button>
          </form>
      </div>
    </div>
  );
}
