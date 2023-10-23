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
  console.log(plants)

  return (
    <>
      <div className="mt-16 lg:mt-24 flex flex-wrap justify-center max-w-[90%] m-auto">
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
              <div className="lg:text-sm">
                {t.family}<br />
                <i>{t.genre}</i><br />
                <i>{t.species}</i><br />
                {t.cultivar}<br />
              </div>
              <div className="lg:text-sm"></div>
            </div>

            <div className="flex relative w-80 lg:w-60 p-4 justify-between">
              <RemoveBtn size={20} id={t._id} onPlantDeleted={loadPlants}/>
              <Link href={`/editPlant/${t._id}`}>
                <HiPencilAlt size={20} />
              </Link>
            </div>
          </div>
          </>
          ))
        )}
      <div className="flex w-80 lg:w-96 m-4 justify-center items-center h-inherit">
          <AddPlant onPlantAdded={loadPlants}/>
      </div>
      </div>
    </>
  );
}
