"use client";
import React, { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function RemoveBtn({ id , onPlantDeleted }) {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  
  const handleConfirm = async () => {
    const res = await fetch(`http://localhost:3000/api/plants?id=${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.push("/settings");
      if (onPlantDeleted) onPlantDeleted();
      setShowModal(false);
    } else {
      throw new Error("Failed to delete the plant");
    }
  };

  const removePlant = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const res = await fetch(`http://localhost:3000/api/plants?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
          router.push("/settings");
          if (onPlantDeleted) onPlantDeleted();  // Call the function to re-fetch plants
      } else {
        throw new Error("Failed to create a plant");
      }
    }
  };

  return (
    <>
      <button onClick={() => {setShowModal(true)}}
        className="text-red-400">
        <HiOutlineTrash size={24} />
      </button>
      
      {showModal && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Deletion</h3>
            <p className="py-4">Are you sure you want to delete this plant?</p>
            <div className="modal-action">
              <button onClick={() => setShowModal(false)} className="btn">Cancel</button>
              <button onClick={handleConfirm} className="btn btn-danger">Confirm</button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}
