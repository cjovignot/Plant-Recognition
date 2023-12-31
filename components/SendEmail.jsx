"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';


export default function SendEmail() {
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fieldNames = {
        pseudo: "Pseudo",
        password: "Mot de passe"
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
      const res = await fetch(`/api/users`, {
          method: "POST",
          headers: {
              "Content-type": "application/json",
          },
          body: JSON.stringify({ pseudo, password }),
      });
      
      const data = await res.json(); // <-- Parse the response body here

      if (res.ok) {
          router.push("/");
          toast.success('Inscription réussie !')
          resetForm();
      } else {
          toast.error(data.message || "Failed to create a user");
      }
    } catch (error) {
        toast.error(error.message);
    }
  };
  
  const resetForm = () => {
    setPseudo("");
    setPassword("");
    setErrorMessage("");
};

  return (
    <>
    <dialog id="my_modal_email" className="modal modal-middle lg:modal-middle">
        <div className="modal-box text-black">
            <h2 className="text-3xl font-bold text-center my-8">Mot de passe oublié</h2>
            <div className="flex justify-center max-h-128">
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    onChange={(e) => setPseudo(e.target.value)}
                    value={pseudo}
                    type="text"
                    placeholder="Pseudo"
                    className="input input-bordered w-full"
                />

                <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="email"
                    placeholder="email"
                    className="input input-bordered w-full"
                />
                {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}

                <div className="flex justify-between mt-4">
                    <button
                        type="button"
                        className="bg-red-600 font-bold text-white py-3 px-6 w-fit m-auto rounded-lg"
                        onClick={() => {
                            document.getElementById('my_modal_email').close();
                            resetForm();
                        }}
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        className="bg-green-600 font-bold text-white py-3 px-6 w-fit m-auto rounded-lg"
                        onClick={() => {
                            document.getElementById('my_modal_email').close();
                        }}
                    >
                        Envoyer
                    </button>
                </div>
                </form>
            </div>
            </div>
    </dialog>
    </>
  );
}
