"use client";
import React, { useState } from "react";
import { useSpring, animated } from '@react-spring/web'
import { HiOutlineTrash } from "react-icons/hi";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";

export default function RemoveBtn({ id , onPlantDeleted }) {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  
  const handleConfirm = async () => {
      const res = await fetch(`/api/plants?id=${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      toast.success("Plante supprimée !")
      if (onPlantDeleted) onPlantDeleted();
      setShowModal(false);
    } else {
      toast.error("Echec de la suppression..")
      throw new Error("Failed to delete the plant");
    }
  };

  return (
    <>
      <button onClick={() => {setShowModal(true)}}
        className="text-red-400">
        <HiOutlineTrash size={24} />
      </button>

      {showModal && (
        <dialog open className="modal modal-middle sm:modal-middle">
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="modal-box">

            <h3 className="font-bold text-lg text-center">Confirmer la suppression ?</h3>
            <div className="modal-action flex justify-between">
              <button onClick={() => setShowModal(false)} className="bg-red-600 font-bold text-white py-3 px-6 rounded-lg">Annuler</button>
              <button onClick={handleConfirm} className="bg-green-600 font-bold text-white py-3 px-6 rounded-lg">Confirmer</button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}
