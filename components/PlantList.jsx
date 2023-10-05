"use client"
import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import { useState, useEffect } from 'react';

const getTopics = async () => {
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

  useEffect(() => {
    async function fetchData() {
      const result = await getTopics();
      console.log(result)
      setPlants(result.plants || []);
    }

    fetchData();
  }, []);

  return (
    <>
      <div className="mt-32 flex flex-wrap justify-between max-w-[90%] m-auto">
      {plants.length === 0 ? (
          <div className="flex w-full h-[80vh] justify-center items-center">
            <span className="loading loading-spinner text-success w-16 h-16"></span>
          </div>
        ) : (
        plants.map((t) => (
          <div
            key={t._id}
            className="p-4 m-4 border border-slate-300 flex justify-between gap-5 items-start w-96"
          >
            <div>
              <h2 className="font-bold text-2xl">{t.title}</h2>
              <div>{t.description}</div>
              <div>{t.family}</div>
            </div>

            <div className="flex gap-2">
              <RemoveBtn id={t._id} />
              <Link href={`/editPlant/${t._id}`}>
                <HiPencilAlt size={24} />
              </Link>
            </div>
          </div>
          ))
        )}
      </div>
    </>
  );
}
