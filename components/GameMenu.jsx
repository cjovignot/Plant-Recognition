"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ImArrowRight, ImArrowDown } from 'react-icons/im';
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi'
import { BiSolidDownArrow } from 'react-icons/bi';
import { PLANT_GROUPS } from '@/app/utils/plants/plants'


export default function GameMenu() {
    const levels = ['Chill', 'Entrainement', 'Qui veut gagner des graines en masse ?', 'Custom']
    const [plants, setPlants] = useState([])
    const [groups, setGroups] = useState([])
    const [selectedLevel, setSelectedLevel] = useState(levels[0]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const getPlants = async () => {
        try {
          const url = `/api/plants`;
      
          const res = await fetch(url, {
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
      
    useEffect(() => {
        async function fetchData() {
            try {
                const result = await getPlants();
                setPlants(result);

                const uniqueGroupValues = Array.from(new Set(result.plants.map(item => item.group)))
                               .sort((a, b) => a.localeCompare(b));
                setGroups(uniqueGroupValues);
            } catch (error) {
                console.error("Error fetching plants:", error);
            }
        }
        fetchData()
    }, []);


    const [activeButtons, setActiveButtons] = useState({
        "Nom commun": false,
        "Famille": false,
        "Genre": false,
        "Espèce": false,
        "Cultivar": false,
    });

    const toggleButtonActive = (label) => {
        setActiveButtons(prevState => ({
            ...prevState,
            [label]: !prevState[label]
        }));
    }

    const handleSelectAll = () => {
        setSelectAll(true);
        setSelectedItems(PLANT_GROUPS); // Assuming these are your options
    };
    const handleSelectNone = () => {
        setSelectAll(false);
        setSelectedItems([]); // Assuming these are your options
    };

    const handleSelectionChange = (item) => {
        setSelectedItems(prevItems => {
            if (prevItems.includes(item)) {
                return prevItems.filter(i => i !== item);
            } else {
                return [...prevItems, item];
            }
        });
    };

    const handleRangeChange = (e) => {
        const value = parseFloat(e.target.value);
        let index;
        
        if (value < 33) {
            index = 0;
        } else if (value < 66) {
            index = 1;
        } else if (value < 99) {
            index = 2;
        } else {
            index = 3;
        }

        setSelectedLevel(levels[index]);
    }

    const getRangeValue = (level) => {
        const index = levels.indexOf(level);
        switch(index) {
            case 0: return 0;
            case 1: return 33;
            case 2: return 66;
            case 3: return 100;
            default: return 0;
        }
    }

  return (
    <>
        <div className="lg:mt-20 lg:card w-screen lg:h-auto h-screen lg:w-auto bg-base-100 shadow-xl">
            <div className="card-body flex flex-col lg:min-w-[550px] justify-start">
                <h2 className="pt-10 lg:pt-0 text-center text-2xl lg:text-3xl font-bold">Game Menu</h2>

                <div className="mt-4">
                    <h2 className="sm:text-sm lg:text-lg h-10"><b>Difficulté :</b> {selectedLevel}</h2>
                    <input
                        onChange={handleRangeChange}
                        type="range"
                        min={0}
                        max={100}
                        // value={0}
                        value={getRangeValue(selectedLevel)}
                        className="range range-success range-xs mt-3" 
                        step="33.33"
                    />
                    <div className="w-full flex justify-between text-xs px-2">
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                    </div>

                    <div className='flex flex-col'>
                        {selectedLevel === 'Chill' &&
                            <>
                            <div className="flex self-center flex-col my-4 items-center lg:text-lg text-md font-bold justify-center h-[120px] border rounded-lg w-fit p-4 border-4 border-[#059669]">Photo
                                <ImArrowDown style={{ marginTop: '10px', marginBottom: '10px' }} />
                                4 choix pour chaque élément
                            </div>
                            </>
                        }
                        {selectedLevel === 'Entrainement' &&
                            <>
                            <div className="flex self-center flex-col my-4 items-center lg:text-lg text-md font-bold justify-center h-[120px] border rounded-lg w-fit p-4 border-4 border-[#059669]">Photo
                                <ImArrowDown style={{ marginLeft: '10px', marginRight: '10px' }} />
                                Nom commun
                            </div>
                            </>
                        }
                        {selectedLevel === 'Qui veut gagner des graines en masse ?' &&
                            <>
                            <p className='font-bold text-red-600 text-center'>🚧 En cours de développement 🚧</p>
                            <div className="flex self-center my-4 items-center lg:text-lg text-md font-bold justify-center h-[120px] border rounded-lg w-fit h-fit p-4 border-4 border-[#059669]">Photo
                                <ImArrowRight style={{ marginLeft: '10px', marginRight: '10px' }} />
                                <div className="flex flex-col text-md font-bold ml-8">
                                    <p>1. Nom commun</p>
                                    <p>2. Famille</p>
                                    <p>3. Genre</p>
                                    <p>4. Espèce</p>
                                    <p>5. Cultivar</p>
                                </div>
                            </div>
                            </>
                        }
                        {selectedLevel === 'Custom' &&
                            <>
                            <div className="flex flex-col items-center">
                                <p className='font-bold text-red-600 text-center'>🚧 En cours de développement 🚧</p>
                                <div className="flex flex-col items-center">
                                    <p className="flex self-center flex-col my-4 items-center lg:text-lg text-md font-bold justify-center h-[120px] border rounded-lg w-fit p-4 border-4 border-[#059669]">Photo
                                        <ImArrowDown style={{ marginTop: '4px', marginBottom: '4px' }} />
                                            Questions au hasard :
                                    </p>
                                </div>

                                <div className='w-[100%] text-center'>
                                    <button 
                                        className={`btn btn-sm rounded-full m-1 btn-ghost border-4 text-black ${activeButtons["Nom commun"] ? 'border-[#059669] border-4 text-[#059669]' : ''}`} 
                                        onClick={() => toggleButtonActive("Nom commun")}
                                    >
                                        Nom commun
                                    </button>
                                    <button 
                                        className={`btn btn-sm rounded-full m-1 btn-ghost border-4 text-black ${activeButtons["Famille"] ? 'border-[#059669] border-4 text-[#059669]' : ''}`} 
                                        onClick={() => toggleButtonActive("Famille")}
                                    >
                                        Famille
                                    </button>
                                    <button 
                                        className={`btn btn-sm rounded-full m-1 btn-ghost border-4 text-black ${activeButtons["Genre"] ? 'border-[#059669] border-4 text-[#059669]' : ''}`} 
                                        onClick={() => toggleButtonActive("Genre")}
                                    >
                                        Genre
                                    </button>
                                    <button 
                                        className={`btn btn-sm rounded-full m-1 btn-ghost border-4 text-black ${activeButtons["Espèce"] ? 'border-[#059669] border-4 text-[#059669]' : ''}`} 
                                        onClick={() => toggleButtonActive("Espèce")}
                                    >
                                        Espèce
                                    </button>
                                    <button 
                                        className={`btn btn-sm rounded-full m-1 btn-ghost border-4 text-black ${activeButtons["Cultivar"] ? 'border-[#059669] border-4 text-[#059669]' : ''}`} 
                                        onClick={() => toggleButtonActive("Cultivar")}
                                    >
                                        Cultivar
                                    </button>
                                </div>
                            </div>
                            </>
                        }
                    </div>
                </div>

                <div className="multi-select-dropdown mx-auto mt-10 lg:mt-0">
                    <div className="dropdown dropdown-top lg:dropdown-right">
                            
                        <label tabIndex={0} className="btn w-32">Groupes<BiSolidDownArrow/></label>
                        <ul tabIndex={0} className="dropdown-content w-32 mb-2 max-h-60 z-[1] menu p-2 shadow bg-base-100 rounded-box">
                        <div className='overflow-y-scroll divide-y divide-solid'>
                            <div className='flex justify-around mb-2'>
                                <button
                                    onClick={handleSelectAll}
                                    className="btn btn-sm text-[10px] btn-outline border-emerald-600 hover:bg-emerald-600 hover:border-emerald-600 text-emerald-600 focus:text-white"
                                >
                                    <HiOutlineSun size={20}/>
                                </button>
                                <button
                                    onClick={handleSelectNone}
                                    className="btn btn-sm text-[10px] btn-outline border-emerald-600 hover:bg-emerald-600 hover:border-emerald-600 text-emerald-600 focus:text-white"
                                >
                                    <HiOutlineMoon size={20}/>
                                </button>
                            </div>

                            <div className='pt-1'>
                                {groups.map((item) => (
                                    <li key={item}>
                                        <label>
                                        <input 
                                            type="checkbox" 
                                            value={item}
                                            checked={selectedItems.includes(item)}
                                            onChange={() => handleSelectionChange(item)}
                                        />{item}</label>
                                    </li>
                                ))}
                            </div>
                        </div>
                        </ul>
                    </div>
                </div>
                
                {selectedItems.length < 1 || selectedLevel === 'Custom' || selectedLevel === 'Qui veut gagner des graines en masse ?' ? (
                    <Link 
                        disabled
                        className="btn w-32 m-auto btn-outline border-emerald-600 hover:bg-emerald-600 hover:border-emerald-600 text-emerald-600"
                        
                        href={{
                            pathname: `/levels/${selectedLevel}`,
                            query: { groups: selectedItems }
                        }}
                    >
                        Jouer
                    </Link>
                ) : (
                    <Link 
                        className="btn w-32 m-auto btn-outline border-emerald-600 hover:bg-emerald-600 hover:border-emerald-600 text-emerald-600"
                        
                        href={{
                            pathname: `/levels/${selectedLevel}`,
                            query: { groups: selectedItems }
                        }}
                    >
                        Jouer
                    </Link>
                )
                }
            </div>
        </div>
    </>
  );
}
