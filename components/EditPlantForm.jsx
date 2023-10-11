"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditPlantForm({ id, name, family, genre, species, cultivar, group, imageUrl }) {
  const [newName, setNewName] = useState(name);
  const [newFamily, setNewFamily] = useState(family);
  const [newGenre, setNewGenre] = useState(genre);
  const [newSpecies, setNewSpecies] = useState(species);
  const [newCultivar, setNewCultivar] = useState(cultivar);
  const [newImageUrl, setNewImageUrl] = useState(imageUrl);
  const [newGroup, setNewGroup] = useState(group);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/plants/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newName, newFamily, newGenre, newSpecies, newCultivar, newGroup, newImageUrl }),
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

  
  const handleImageUpload = async (e) => {
    const fileInput = e.target;
    const uploadedUrls = []; // Array to collect the URLs of the uploaded images

    for (const file of fileInput.files) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'ml_default');

        const data = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`, {
            method: 'POST',
            body: formData
        }).then(r => r.json());

        uploadedUrls.push(data.secure_url);
        console.log(11, uploadedUrls)
    }

    setNewImageUrl(uploadedUrls);
  };

  return (
    <div className="mt-32 w-[500px]">
      <div className="w-full flex">
        {newImageUrl.map((url, index) => (
          <div key={index} className="h-60 rounded-2xl w-full mb-4" style={{
            backgroundImage: `url(${url})`,
            backgroundPosition: "center",
            backgroundSize: "cover"
          }}>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input 
            type="file"
            multiple
            onChange={(e) => {
                handleImageUpload(e);
            }}
            className="input input-bordered w-full mt-4"
        />
        <input type="text" value={newImageUrl} hidden />

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

        <select className="select select-bordered w-full"
            onChange={(e) => setNewGroup(e.target.value)}
            value={newGroup}
        >
            <option disabled selected>Groupe</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
        </select>

        <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit m-auto">
          Sauvegarder
        </button>
      </form>
    </div>
  );
}
