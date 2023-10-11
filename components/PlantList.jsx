"use client"
import Link from "next/link";
import AddPlant from '@/components/AddPlant';
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt, HiOutlinePlus } from "react-icons/hi";
import { FaLayerGroup } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const getPlants = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/plants", {
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
      <div className="mt-32 flex flex-wrap justify-center max-w-[90%] m-auto">
      {plants.length === 0 ? (
          <div className="flex w-full h-[80vh] justify-center items-center">
            <span className="loading loading-spinner text-success w-16 h-16"></span>
          </div>
        ) : (
        plants.map((t) => (
          <>
          <div
            key={t._id}
            className="card w-96 bg-base-100 shadow-xl m-4"
          >
            <div className="w-full h-60 rounded-t-2xl" style={{
              backgroundImage:`url(${t.imageUrl[0]})`,
              backgroundPosition: "center",
              backgroundSize: "cover"
            }}>
            </div>

            <div className="card-body p-4 pb-0">
              <div className="flex items-center"><FaLayerGroup style={{ marginRight: '8px', color: 'green' }}/><b>{t.group}</b></div>
              <h2 className="font-bold text-2xl">{t.name}</h2>
              <div>{t.family}</div>
              <div><i>{t.genre}</i></div>
              <div><i>{t.species}</i></div>
              <div>{t.cultivar}</div>
            </div>

            <div className="flex relative w-96 p-4 justify-between">
              <RemoveBtn id={t._id} onPlantDeleted={loadPlants}/>
              <Link href={`/editPlant/${t._id}`}>
                <HiPencilAlt size={30} />
              </Link>
            </div>
          </div>
          </>
          ))
        )}
      <div className="flex w-96 m-4 justify-center items-center h-inherit">
          <AddPlant onPlantAdded={loadPlants}/>
      </div>
      </div>
    </>
  );
}
