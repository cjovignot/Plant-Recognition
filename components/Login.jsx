"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Login({ onUserLogin }) {
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

    const stateValues = { pseudo, password };
    const emptyFields = Object.keys(fieldNames).filter(key => !stateValues[key]);
    
    if (emptyFields.length) {
        const fieldsToFill = emptyFields.map(key => fieldNames[key]).join(', ');
        setErrorMessage(`Merci de remplir les champs suivants : ${fieldsToFill}`);
        return;
    } else {
        setErrorMessage("");  // clear the error message if all fields are filled
    }

    try {
      const res = await fetch("http://localhost:3000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pseudo, password }),
      });

      if (res.ok) {
        router.push("/");
        localStorage.setItem('client', pseudo);
        resetForm();
        onUserLogin(pseudo); 
      } else {
          const data = await res.json();
          setErrorMessage(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const resetForm = () => {
    setPseudo("");
    setPassword("");
    setErrorMessage("");
};

  return (
    <>
    <dialog id="my_modal_login" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box text-black">
            <h2 className="text-3xl font-bold text-center my-8">Login</h2>
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
                    type="text"
                    placeholder="Mot de passe"
                    className="input input-bordered w-full"
                />
                {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}

                <div className="flex justify-between mt-4">
                    <button
                        type="button"
                        className="bg-red-600 font-bold text-white py-3 px-6 w-fit m-auto rounded-lg"
                        onClick={() => {
                            document.getElementById('my_modal_login').close();
                            resetForm();
                        }}
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        className="bg-green-600 font-bold text-white py-3 px-6 w-fit m-auto rounded-lg"
                        onClick={() => {
                            document.getElementById('my_modal_login').close();
                        }}
                    >
                        Login
                    </button>
                </div>
                </form>
            </div>
            </div>
    </dialog>
    </>
  );
}
