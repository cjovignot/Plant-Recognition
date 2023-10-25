"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PLANT_GROUPS, PLANT_PH, PLANT_EXPOSITION, PLANT_HUMIDITE, PLANT_CATEGORY } from '@/app/utils/plants/plants'

export default function EditPlantForm({ id, name, family, genre, species, cultivar, group, imageUrl }) {
  const [newName, setNewName] = useState(name);
  const [newFamily, setNewFamily] = useState(family);
  const [newGenre, setNewGenre] = useState(genre);
  const [newSpecies, setNewSpecies] = useState(species);
  const [newCultivar, setNewCultivar] = useState(cultivar);
  const [newImageUrl, setNewImageUrl] = useState(imageUrl);
  const [newGroup, setNewGroup] = useState(group);
  const [newPh, setNewPh] = useState("")
  const [newExposition, setNewExposition] = useState("")
  const [newHumidite, setNewHumidite] = useState("")
  const [newCategory, setNewCategory] = useState("")

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const res = await fetch(`${process.env.NEXT_PUBLIC_ROOTPATH}/api/plants/${id}`, {
        const res = await fetch(`/api/plants/${id}`, {
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
    <div className="w-[90%] h-screen flex justify-around lg:items-center items-start lg:mt-0 mt-20">
      <div className="flex flex-col max-h-128 overflow-hidden overflow-y-scroll no-scrollbar">
        {newImageUrl.map((url, index) => (
          <div key={index} className="h-38 rounded-2xl lg:w-96 w-28 mb-4 mx-1 text-white text-opacity-50 flex pl-4 items-center lg:text-8xl text-7xl" style={{
            backgroundImage: `url(${url})`,
            backgroundPosition: "center",
            backgroundSize: "cover"
          }}><div>{index+1}</div>
          </div>
        ))}
      </div>
      <div className="w-[500px]">
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2">
          <input 
              type="file"
              multiple
              onChange={(e) => {
                  handleImageUpload(e);
              }}
              className="file-input file-input-sm file-input-bordered file-input-success lg:w-full w-60"
          />
          <input type="text" value={newImageUrl} hidden />

          <input
              onChange={(e) => setNewName(e.target.value)}
              value={newName}
              type="text"
              placeholder="Nom commun"
              className="input input-sm input-bordered lg:w-full w-60"
          />

          <input
              onChange={(e) => setNewFamily(e.target.value)}
              value={newFamily}
              type="text"
              placeholder="Famille"
              className="input input-sm input-bordered lg:w-full w-60"
          />

          <input
              onChange={(e) => setNewGenre(e.target.value)}
              value={newGenre}
              type="text"
              placeholder="Genre"
              className="input input-sm input-bordered lg:w-full w-60"
          />

          <input
              onChange={(e) => setNewSpecies(e.target.value)}
              value={newSpecies}
              type="text"
              placeholder="Espèce"
              className="input input-sm input-bordered lg:w-full w-60"
          />

          <input
              onChange={(e) => setNewCultivar(e.target.value)}
              value={newCultivar}
              type="text"
              placeholder="Cultivar"
              className="input input-sm input-bordered lg:w-full w-60"
          />

          <select className="select select-sm select-bordered lg:w-full w-60"
              onChange={(e) => setNewGroup(e.target.value)}
              value={newGroup}
          >
            <option disabled selected>Groupe</option>
            {PLANT_GROUPS.map((groupValue) => (
                <option key={groupValue} value={groupValue}>
                    {groupValue}
                </option>
            ))}
          </select>

          <div className="divider">CARACTERISTIQUES</div>

          <select className="select select-sm select-bordered lg:w-full w-60"
              onChange={(e) => setNewPh(e.target.value)}
              value={newPh}
          >
          <option disabled selected>PH</option>
          {PLANT_PH.map((value) => (
              <option key={value} value={value}>
                  {value}
              </option>
          ))}
          </select>

          <select className="select select-sm select-bordered lg:w-full w-60"
              onChange={(e) => setNewExposition(e.target.value)}
              value={newExposition}
          >
          <option disabled selected>Exposition</option>
          {PLANT_EXPOSITION.map((value) => (
              <option key={value} value={value}>
                  {value}
              </option>
          ))}
          </select>

          <select className="select select-sm select-bordered lg:w-full w-60"
              onChange={(e) => setNewHumidite(e.target.value)}
              value={newHumidite}
          >
          <option disabled selected>Humidité</option>
          {PLANT_HUMIDITE.map((value) => (
              <option key={value} value={value}>
                  {value}
              </option>
          ))}
          </select>

          <select className="select select-sm select-bordered lg:w-full w-60"
              onChange={(e) => setNewCategory(e.target.value)}
              value={newCategory}
          >
          <option disabled selected>Catégorie</option>
          {PLANT_CATEGORY.map((value) => (
              <option key={value} value={value}>
                  {value}
              </option>
          ))}
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
