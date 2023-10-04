"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditPlantForm({ id, title, description, family }) {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newFamily, setNewFamily] = useState(family);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/plants/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newTitle, newDescription, newFamily }),
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
            onChange={(e) => setNewTitle(e.target.value)}
            value={newTitle}
            type="text"
            placeholder="Nom latin"
            className="input input-bordered w-full"
        />

        <input
            onChange={(e) => setNewDescription(e.target.value)}
            value={newDescription}
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

        <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit m-auto">
          Sauvegarder
        </button>
      </form>
    </div>
  );
}
