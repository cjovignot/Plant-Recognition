"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HiOutlinePlus } from "react-icons/hi";

export default function AddPlant({ onPlantAdded }) {
  const [name, setName] = useState("");
  const [family, setFamily] = useState("");
  const [genre, setGenre] = useState("")
  const [species, setSpecies] = useState("")
  const [cultivar, setCultivar] = useState("")
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fieldNames = {
        name: "Nom commun",
        family: "Famille",
        genre: "Genre",
        species: "Espèce",
        cultivar: "Cultivar"
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
        if (onPlantAdded) onPlantAdded();  // Call the function to re-fetch plants
      } else {
        throw new Error("Failed to create a plant");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    {/* Open the modal using document.getElementById('ID').showModal() method */}
    <button className="btn btn-ghost w-36 h-36 normal-case text-xl" onClick={()=>document.getElementById('my_modal_5').showModal()}><HiOutlinePlus size={60}/></button>
    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
            <h2 className="text-3xl font-bold text-center my-8">Ajouter une plante</h2>
            <div className="w-96 m-auto">
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type="text"
                    placeholder="Nom commun"
                    className="input input-bordered w-full"
                />

                <input
                    onChange={(e) => setFamily(e.target.value)}
                    value={family}
                    type="text"
                    placeholder="Famille"
                    className="input input-bordered w-full"
                />

                <input
                    onChange={(e) => setGenre(e.target.value)}
                    value={genre}
                    type="text"
                    placeholder="Genre"
                    className="input input-bordered w-full"
                />

                <input
                    onChange={(e) => setSpecies(e.target.value)}
                    value={species}
                    type="text"
                    placeholder="Espèce"
                    className="input input-bordered w-full"
                />

                <input
                    onChange={(e) => setCultivar(e.target.value)}
                    value={cultivar}
                    type="text"
                    placeholder="Cultivar"
                    className="input input-bordered w-full"
                />
                {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}

                <div className="flex justify-between mt-4">
                    <button
                        type="button"
                        className="bg-red-600 font-bold text-white py-3 px-6 w-fit m-auto rounded-lg"
                        onClick={() => {
                            document.getElementById('my_modal_5').close();
                            setErrorMessage("");
                        }}
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        className="bg-green-600 font-bold text-white py-3 px-6 w-fit m-auto rounded-lg"
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
    </dialog>
    </>
  );
}
