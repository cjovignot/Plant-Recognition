"use client"
import Link from "next/link";
import AddPlant from '@/components/AddPlant';
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt, HiOutlinePlus } from "react-icons/hi";
import { FaLayerGroup } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const getPlants = async () => {
  try {
    // const res = await fetch(`${process.env.NEXT_PUBLIC_ROOTPATH}/api/plants`, {
      const res = await fetch(`/api/plants`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch plants");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading plants: ", error);
  }
};

export default function PlantsList() {
  const [plants, setPlants] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const role = localStorage.getItem('role');
    
    if(role === 'admin') {
      setIsAdmin(true); // Convert to boolean and set state
    }
  })

  // Load plants from API and update state
  const loadPlants = async () => {
    const result = await getPlants();
    setPlants(result.plants || []);
  };

  useEffect(() => {
    loadPlants();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const result = await getPlants();
      setPlants(result.plants || []);
    }

    fetchData();
  }, []);

  return (
    <>
      <div className="mt-16 lg:mt-24 flex flex-wrap justify-center max-w-[90%] m-auto">
      {isAdmin &&
        <button 
            className="z-10 btn rounded-full w-auto w-10 h-10 fixed lg:right-4 lg:top-16 right-2 btn-sm bg-emerald-600 flex justify-start group" 
            onClick={()=>document.getElementById('my_modal_5').showModal()}
        >
            <HiOutlinePlus size={15} style={{ color: 'white' }} />
            <span className="hidden group-hover:inline-block text-[11px]">Ajouter</span>
        </button>
      }
      {plants.length === 0 ? (
          <div className="flex w-full h-[80vh] justify-center items-center">
            <span className="loading loading-spinner text-success w-16 h-16"></span>
          </div>
        ) : (
        plants.map((t) => (
          <>
          <div
            key={t._id}
            className="card w-80 lg:w-60 bg-base-100 shadow-xl lg:m-4 my-3"
          >
            <div className="flex">
              <div className="w-48 lg:w-36 h-42 lg:h-48 rounded-tl-2xl mr-1" style={{
                backgroundImage:`url(${t.imageUrl[0]})`,
                backgroundPosition: "center",
                backgroundSize: "cover"
              }}>
              </div>
              <div className="flex flex-col">
                <div className="w-36 lg:w-24 h-20 lg:h-[50%] rounded-tr-2xl" style={{
                  backgroundImage:`url(${t.imageUrl[1]})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover"
                }}>
                </div>
                <div className="w-36 lg:w-24 h-20 lg:h-[50%] mt-1" style={{
                  backgroundImage:`url(${t.imageUrl[2]})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover"
                }}>
                </div>
              </div>
            </div>

            <div className="card-body p-4 pb-0">
              <div className="flex items-center lg:text-sm"><FaLayerGroup style={{ marginRight: '8px', color: 'green' }}/><b>{t.group}</b></div>
              <h2 className="font-bold text-xl lg:text-sm">{t.name[0]}</h2>
              <div className="flex lg:flex-col justify-between">
                <div className="lg:text-sm">
                  {t.family}<br />
                  <i>{t.genre}</i><br />
                  <i>{t.species}</i><br />
                  {t.cultivar}<br />
                </div>
                <div className="lg:mt-4 text-right">
                  <div className="badge bg-[#fbbd23] text-black">{t.exposition}</div><br />
                  <div className="badge bg-[#3abff8] text-black">{t.humidite}</div><br />
                  <div className="badge bg-[#594839] text-white">{t.ph}</div><br />
                  <div className="badge bg-[#059669] text-white">{t.category}</div><br />
                </div>
              </div>
            </div>

            {isAdmin &&
              <div className="flex relative w-80 lg:w-60 p-4 justify-between">
                <RemoveBtn size={20} id={t._id} onPlantDeleted={loadPlants}/>
                <Link href={`/editPlant/${t._id}`}>
                  <HiPencilAlt size={20} />
                </Link>
              </div>
            }
          </div>
          </>
          ))
        )}
      <div className="flex w-80 lg:w-96 m-4 justify-center items-center h-inherit">
        <AddPlant onPlantAdded={loadPlants} />
      </div>
      </div>
    </>
  );
}
