"use client"

import { useState, useEffect } from "react";
import { useRouter } from 'next/router';


const getPlants = async (groups) => {
  try {
    // const res = await fetch(`${process.env.NEXT_PUBLIC_ROOTPATH}/api/plants/groups/groups?${params}`, {
      const res = await fetch(`/api/${groups}?groups=${groups}`, {
        // const res = await fetch(`/api/plants`, {
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

const getAllPlants = async () => {
  try {
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


export default function Level1() {
    
  const router = useRouter();
  const { groups } = router.query;

  const [plants, setPlants] = useState([]);
  const [questions, setQuestions] = useState(0)
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [trueArray, setTrueArray] = useState([]);
  const [falseArray, setFalseArray] = useState([]);
  const [finish, setFinish] = useState(false);
  // const [groups, setGroups] = useState(null);

  // useEffect(() => {
  //   const params = new URLSearchParams(window.location.search);
  //   const groups = params.get("groups");
  //   // Now you can use the 'groups' value as needed
  // }, []);

  const handleButtonClick = () => {
      setFinish(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const fieldNames = {
      name: "Nom commun"
    };
  
    // Check if any of the required fields are empty
    const emptyFields = Object.keys(fieldNames).filter(key => !fieldNames[key]);
  
    if (emptyFields.length) {
      const fieldsToFill = emptyFields.map(key => fieldNames[key]).join(', ');
      setErrorMessage(`Merci de remplir les champs suivants : ${fieldsToFill}`);
    } else {
      setErrorMessage(""); // Clear the error message if all fields are filled
  
      if (plants.length > 0) {
        const plant = plants[0];
  
        // Check if the input value matches the corresponding field in the plant object
        if (name === plant.name) {
          setTrueArray(prevArray => [...prevArray, plant]);
        } else {
          // Add the 'answer' property to the plant object in the falseArray
          const plantWithAnswer = {
            ...plant,
            answer: {name}
          };
          setFalseArray(prevArray => [...prevArray, plantWithAnswer]);
        }
        setPlants(prevPlants => prevPlants.slice(1));
      }
  
      resetForm();
    }
  };

  const resetForm = () => {
    setName("");
    setErrorMessage("");
  };
    
  useEffect(() => {
    async function fetchData() {
      if (groups && groups !== null) { // Check if groups is not empty
        try {
          const result = await getPlants(groups);
          setPlants(result?.plants || []);
          setQuestions(result?.plants.length);
        } catch (error) {
          console.error("Error fetching plants:", error);
          // Handle the error appropriately
        }
      } else {
        const alternativeResult = await getAllPlants();
        setPlants(alternativeResult?.plants || []);
        setQuestions(alternativeResult?.plants.length);
      }
    }

    fetchData();
  }, [groups]);

    return (
        <>   
        {questions === 0 && finish === false &&
            <div className="flex w-full h-[80vh] justify-center items-center">
              <span className="loading loading-spinner text-success w-16 h-16"></span>
            </div>
        }
        {plants.length > 0 &&
          <div className="h-screen flex justify-center items-center m-auto lg:pt-28">
          <div className="bg-base-100 shadow-xl lg:rounded-3xl">
            <div className="flex flex-col h-screen lg:h-[35rem] w-screen lg:max-w-[700px] justify-between">
              <div className="w-auto h-[45rem] lg:rounded-t-3xl" style={{
                backgroundImage: `url(${plants[0].imageUrl[Math.floor(Math.random() * plants[0].imageUrl.length)]})`,
                backgroundPosition: "center",
                backgroundSize: "cover"
              }}></div>
        
                <div className="flex flex-col h-60 justify-around items-center pb-10">
                <h2 className="card-title text-2xl">Réponse {plants[0]?.name}</h2>
                  <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-3">
                    <input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        type="text"
                        placeholder="Nom commun"
                        className="input input-bordered w-full"
                    />
                    {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}
        
                    {plants.length === 1 ? (
                      <button
                          type="submit"
                          className="btn btn-outlined bg-green-600"
                          onClick={handleButtonClick}
                      >
                          Valider
                      </button>
                    ) : (
                      <button
                          type="submit"
                          className="btn btn-outlined bg-green-600"
                      >
                          Valider
                      </button>
                    )}
                  </form>
                </div>
            </div>
          </div>
          </div>
        }
        
        {finish === true &&
          <div className="h-screen flex justify-center items-center m-auto lg:pt-20">
            <div className="bg-base-100 shadow-xl lg:rounded-3xl">
              <div className="flex flex-col h-screen lg:h-[600px] w-screen lg:max-w-[1000px] justify-between">
                  <div className="flex flex-col h-60 justify-around items-center pb-10">
                    <h2 className="pt-20 card-title text-2xl">Résultats</h2>
                    <p>{trueArray.length}/{falseArray.length}</p>
                  </div>
              </div>
            </div>
          </div>
        }
        </>
    )
}
