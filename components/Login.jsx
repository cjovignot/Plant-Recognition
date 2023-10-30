"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import { RiAccountCircleLine } from 'react-icons/ri'
import { FaRegCircleQuestion } from 'react-icons/fa6';

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
        toast.error(`Merci de remplir les champs suivants : ${fieldsToFill}`)
        return;
    } else {
        setErrorMessage("");  // clear the error message if all fields are filled
    }

    try {
      // const res = await fetch(`${process.env.NEXT_PUBLIC_ROOTPATH}/api/login`, {
        const res = await fetch(`/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pseudo, password }),
      });

      if (res.ok) {
        const data = await res.json();
        router.push("/");
        localStorage.setItem('client', pseudo);
        localStorage.setItem('role', data.role);
        resetForm();
        onUserLogin(pseudo);
        toast.success(`Bienvenue ${pseudo} !`)
      } else {
          const data = await res.json();
          setErrorMessage(data.message);
          toast.error(data.message || "Connexion impossible")
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
    <dialog id="my_modal_login" className="modal modal-middle  lg:modal-middle">

      <div className="modal-box flex flex-col items-center text-black">
        <h2 className="text-3xl font-bold text-center mb-8 mt-4 dark:text-white">Login</h2>
        <div className="flex flex-col justify-center max-h-128">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
                onChange={(e) => setPseudo(e.target.value)}
                value={pseudo}
                type="text"
                placeholder="Pseudo"
                className="input input-bordered w-full dark:text-white"
            />

            <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Mot de passe"
                className="input input-bordered w-full dark:text-white"
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
          <div className="flex flex-col mt-4">
            <button className="btn btn-sm btn-ghost my-1 text-[12px] dark:text-white" onClick={()=>document.getElementById('my_modal_signup').showModal()}><RiAccountCircleLine size={20}/>SignUp</button>
            <button className="btn btn-sm btn-ghost my-1 text-[12px] dark:text-white" onClick={()=>document.getElementById('my_modal_email').showModal()}><FaRegCircleQuestion size={18}/>Mot de passe oublié</button>
          </div>
        </div>
      </div>
    </dialog>
    </>
  );
}
