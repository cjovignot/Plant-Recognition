"use client";
import React, { useState } from "react";
import { useSpring, animated } from '@react-spring/web'
import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function RemoveBtn({ id , onPlantDeleted }) {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  // const [springs, api] = useSpring(() => ({
  //   from: { x: 0 },
  //   onChange: ({ value }) => {
  //     console.log(value.x);
  //   }
  // }));
  
  // const handleClick = () => {
  //   const currentValue = springs.x.get();
  //   if (currentValue >= 99) {  // It's close enough to 100
  //     api.start({
  //       x: 0,
  //     });
  //   } else {
  //     api.start({
  //       x: 100,
  //     });
  //   }
  // };
  
  const handleConfirm = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_ROOTPATH}/api/plants?id=${id}`, {
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_ROOTPATH}/api/plants?id=${id}`, {
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
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="modal-box">
      
            {/* <animated.div
              onClick={handleClick}
              style={{
                width: 80,
                height: 80,
                background: '#ff6d6d',
                borderRadius: 8,
                ...springs,
              }}
            /> */}
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
