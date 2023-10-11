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

    // Convert FileList to an array and map it
    const uploadPromises = Array.from(fileInput.files).map(async file => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'ml_default');

        const data = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`, {
            method: 'POST',
            body: formData
        }).then(r => r.json());

        return data.secure_url;
    });

    const uploadedUrls = await Promise.all(uploadPromises);
    setNewImageUrl(uploadedUrls);
  };


  return (
    <>
    <div className="pt-32 w-[90%] h-screen flex justify-around items-center">
      <div className="flex flex-col max-h-128 overflow-hidden overflow-y-scroll no-scrollbar">
        {newImageUrl.map((url, index) => (
          <div key={index} className="h-38 rounded-2xl w-96 mb-4 mx-1 text-white text-opacity-50 flex pl-4 items-center text-8xl" style={{
            backgroundImage: `url(${url})`,
            backgroundPosition: "center",
            backgroundSize: "cover"
          }}><div>{index+1}</div>
          </div>
        ))}
      </div>
      <div className="w-[500px]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-h-128">
          <input 
              type="file"
              multiple
              onChange={(e) => {
                  handleImageUpload(e);
              }}
              className="file-input file-input-bordered file-input-success w-full"
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

          <button className="btn mt-10 w-40 m-auto btn-outline border-emerald-600 hover:bg-emerald-600 hover:border-emerald-600 text-emerald-600">
            Sauvegarder
          </button>
        </form>
      </div>
    </div>
    </>
  );
}
