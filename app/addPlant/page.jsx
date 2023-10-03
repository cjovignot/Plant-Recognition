"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddPlant() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [family, setFamily] = useState("")

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !family) {
      alert("Title and description are required.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/plants", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, description, family }),
    });
    console.log("body:", family)

      if (res.ok) {
        router.push("/");
      } else {
        throw new Error("Failed to create a plant");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-96 m-auto">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="Nom latin"
            className="input input-bordered w-full max-w-xs"
        />

        <input
            onChange={(e) => setDescription(e.target.value)}
            value={description}
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

        <button
            type="submit"
            className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
        >
            Ajouter
        </button>
        </form>
    </div>
  );
}
