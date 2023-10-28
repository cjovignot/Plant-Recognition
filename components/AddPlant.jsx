"use client";

import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import { PLANT_GROUPS, PLANT_PH, PLANT_EXPOSITION, PLANT_HUMIDITE, PLANT_CATEGORY } from '@/app/utils/plants/plants'

export default function AddPlant({ onPlantAdded }) {
  const [name, setName] = useState("");
  const [secondNameAllowed, setSecondNameAllowed] = useState(false)
  const [secondName, setSecondName] = useState("");
  const [family, setFamily] = useState("");
  const [genre, setGenre] = useState("")
  const [species, setSpecies] = useState("")
  const [cultivar, setCultivar] = useState("")
  const [group, setGroup] = useState("Groupe")
//   const [ph, setPh] = useState("")
//   const [exposition, setExposition] = useState("")
//   const [humidite, setHumidite] = useState("")
//   const [category, setCategory] = useState("")
  const [imageUrl, setImageUrl] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleCheckboxChange = (e) => {
    setSecondNameAllowed(e.target.checked);
  }
  const handleSecondNameChange = (e) => {
    setSecondName(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const combinedNames = [name, secondName];

    const fieldNames = {
        name: "Nom commun",
        family: "Famille",
        genre: "Genre",
        species: "Espèce",
        cultivar: "Cultivar",
        imageUrl: "Image",
        group: "Groupe",
        // ph: "PH",
        // exposition: "Exposition",
        // humidite: "Humidité",
        // category: "Catégorie"
    };

    const emptyFields = Object.keys(fieldNames).filter(key => !eval(key)); // Here, `eval(key)` will get the value of the state variable named by the `key`

    if (emptyFields.length) {
        const fieldsToFill = emptyFields.map(key => fieldNames[key]).join(', ');
        setErrorMessage(`Merci de remplir les champs suivants : ${fieldsToFill}`);
        return;
    } else {
        setErrorMessage("");  // clear the error message if all fields are filled
    }

    try {
    //   const res = await fetch(`${process.env.NEXT_PUBLIC_ROOTPATH}/api/plants`, {
        const res = await fetch(`/api/plants`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        // body: JSON.stringify({ name: combinedNames, family, genre, species, cultivar, group, ph, exposition, humidite, category, imageUrl }),
        body: JSON.stringify({ name: combinedNames, family, genre, species, cultivar, group, imageUrl }),
    });

    if (res.ok) {
        toast.success('Plante ajoutée !')
        if (onPlantAdded) onPlantAdded();
        resetForm();
    } else {
        toast.error('Echec de l&apos;ajout')
        throw new Error("Failed to create a plant");
      }
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

        uploadedUrls.push(data.secure_url); // Save each uploaded URL
        setIsUploading(true)
    }

    const stringifiedUrls = uploadedUrls.map(url => url)
    // const urls = prevState => [...prevState, ...stringifiedUrls]
    setImageUrl(stringifiedUrls);
    setIsUploading(false)
};
  
  const resetForm = () => {
    setName("");
    setSecondName("");
    setFamily("");
    setGenre("");
    setSpecies("");
    setCultivar("");
    setGroup("Groupe");
    // setPh("");
    // setExposition("");
    // setHumidite("");
    // setCategory("");
    setImageUrl([]);
    setErrorMessage("");
};

  return (
    <>
    <dialog id="my_modal_5" className="z-10 modal modal-middle lg:modal-middle">
        <div className="modal-box">
            <h2 className="text-3xl font-bold text-center my-8">Ajouter une plante</h2>
            <div className="flex justify-center lg:max-h-128">
                {imageUrl.length > 0 && isUploading === false &&
                    <div className="flex flex-col max-h-128 overflow-hidden overflow-y-scroll">
                        {imageUrl.map((url, index) => (
                            <>
                            <div key={index} className="m-1 rounded-lg w-[5rem] h-[5rem] mx-1 text-black text-opacity-50 flex justify-center items-center text-5xl" style={{
                                backgroundImage: `url(${url})`,
                                backgroundPosition: "center",
                                backgroundSize: "cover"
                            }}><div>{index+1}</div>
                            </div>
                            </>
                        ))}
                    </div>
                }
                <div className="w-[500px]">
                    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2">
                        {isUploading === true &&
                            <span className="fixed right-10 mt-2 loading loading-spinner text-success w-8 h-8"></span>
                        }
                        <input 
                            type="file"
                            multiple
                            onChange={(e) => {
                                handleImageUpload(e);
                            }}
                            className="file-input file-input-sm file-input-bordered file-input-success lg:w-full w-60"
                        />

                        <input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            type="text"
                            placeholder="Nom commun"
                            className="input input-sm input-bordered lg:w-full w-60"
                        />
                        <label className="label cursor-pointer">
                            <input 
                                type="checkbox" 
                                className="checkbox" 
                                onChange={handleCheckboxChange}
                            />
                            <span className="label-text text-slate-400 ml-2 text-start">Nom commun : Option 2</span> 
                        </label>

                        { secondNameAllowed && (
                            <input
                                onChange={handleSecondNameChange}
                                value={secondName}
                                type="text"
                                placeholder="Nom commun autorisé"
                                className="input input-sm input-bordered lg:w-full w-60"
                            />
                        ) }

                        <input
                            onChange={(e) => setFamily(e.target.value)}
                            value={family}
                            type="text"
                            placeholder="Famille"
                            className="input input-sm input-bordered lg:w-full w-60"
                        />

                        <input
                            onChange={(e) => setGenre(e.target.value)}
                            value={genre}
                            type="text"
                            placeholder="Genre"
                            className="input input-sm input-bordered lg:w-full w-60"
                        />

                        <input
                            onChange={(e) => setSpecies(e.target.value)}
                            value={species}
                            type="text"
                            placeholder="Espèce"
                            className="input input-sm input-bordered lg:w-full w-60"
                        />

                        <input
                            onChange={(e) => setCultivar(e.target.value)}
                            value={cultivar}
                            type="text"
                            placeholder="Cultivar"
                            className="input input-sm input-bordered lg:w-full w-60"
                        />

                        <select className="select select-sm select-bordered lg:w-full w-60"
                            onChange={(e) => setGroup(e.target.value)}
                            value={group}
                        >
                            <option disabled selected>Groupe</option>
                            {PLANT_GROUPS.map((groupValue) => (
                                <option key={groupValue} value={groupValue}>
                                    {groupValue}
                                </option>
                            ))}
                        </select>

                        {/* <div className="divider">CARACTERISTIQUES</div>
                        <p className='font-bold text-red-600 text-center -mt-3 mb-2'>🚧 En cours de développement 🚧</p>

                        <select className="select select-sm select-bordered lg:w-full w-60"
                            onChange={(e) => setPh(e.target.value)}
                            value={ph}
                        >
                            <option disabled selected>PH</option>
                            {PLANT_PH.map((value) => (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>

                        <select className="select select-sm select-bordered lg:w-full w-60"
                            onChange={(e) => setExposition(e.target.value)}
                            value={exposition}
                        >
                        <option disabled selected>Exposition</option>
                        {PLANT_EXPOSITION.map((value) => (
                            <option key={value} value={value}>
                                {value}
                            </option>
                        ))}
                        </select>

                        <select className="select select-sm select-bordered lg:w-full w-60"
                            onChange={(e) => setHumidite(e.target.value)}
                            value={humidite}
                        >
                        <option disabled selected>Humidité</option>
                        {PLANT_HUMIDITE.map((value) => (
                            <option key={value} value={value}>
                                {value}
                            </option>
                        ))}
                        </select>

                        <select className="select select-sm select-bordered lg:w-full w-60"
                            onChange={(e) => setCategory(e.target.value)}
                            value={category}
                        >
                        <option disabled selected>Catégorie</option>
                        {PLANT_CATEGORY.map((value) => (
                            <option key={value} value={value}>
                                {value}
                            </option>
                        ))}
                        </select> */}
                        {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}

                        <div className="flex my-4 pb-8 m-auto">
                            <button
                                type="button"
                                className="bg-red-600 font-bold text-white py-3 px-6 w-fit m-auto rounded-lg mr-3"
                                onClick={() => {
                                    document.getElementById('my_modal_5').close();
                                    resetForm();
                                }}
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                className="bg-green-600 font-bold text-white py-3 px-6 w-fit m-auto rounded-lg ml-3"
                                onClick={() => {
                                    document.getElementById('my_modal_5').close();
                                }}
                            >
                                Ajouter
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </dialog>
    </>
  );
}
