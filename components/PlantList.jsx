"use client"
import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt, HiOutlinePlus } from "react-icons/hi";
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
      <div className="mt-32 flex flex-wrap justify-start max-w-[90%] m-auto">
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
            <figure><img src="https://www.lesjardinsdelaterre.com/926-thickbox_default/mimosa-d-hiver-acacia-dealbata-gaulois-astier-.jpg" /></figure>
            <div className="card-body">
              <h2 className="font-bold text-2xl">{t.name}</h2>
              <div>{t.family}</div>
              <div><i>{t.genre}</i></div>
              <div><i>{t.species}</i></div>
              <div>{t.cultivar}</div>
            </div>

            <div className="flex fixed w-96 p-4 justify-between">
              <RemoveBtn id={t._id} />
              <Link href={`/editPlant/${t._id}`}>
                <HiPencilAlt size={30} />
              </Link>
            </div>
          </div>
          </>
          ))
        )}
      <div className="flex w-96 m-4 justify-center items-center h-inherit">
        <Link className="btn btn-ghost w-36 h-36 normal-case text-xl" href={"/addPlant"}>
          <HiOutlinePlus size={60} />
        </Link>
      </div>
      </div>
    </>
  );
}
