"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ImArrowRight } from 'react-icons/im';
import { ImArrowDown } from 'react-icons/im';
import { BiSolidDownArrow } from 'react-icons/bi';


export default function GameMenu() {
    const levels = ['Chill', 'Entrainement', 'Qui veut gagner des graines en masse ?']
    const [selectedLevel, setSelectedLevel] = useState(levels[0]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const handleSelectAll = () => {
        setSelectAll(true);
        setSelectedItems(['1', '2', '3', '4', '5', '6']); // Assuming these are your options
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
        
        if (value <= 49) {
            index = 0;
        } else if (value <= 90) {
            index = 1;
        } else {
            index = 2;
        }

        setSelectedLevel(levels[index]);
    }

    const getRangeValue = (level) => {
        const index = levels.indexOf(level);
        switch(index) {
            case 0: return 0;
            case 1: return 50;
            case 2: return 100;
            default: return 0;
        }
    }

  return (
    <>
        <div className="lg:mt-20 lg:card w-screen lg:h-auto h-screen lg:w-auto bg-base-100 shadow-xl">
            <div className="card-body flex flex-col lg:min-w-[550px] justify-start">
                <h2 className="pt-20 lg:pt-0 text-center text-2xl lg:text-4xl font-bold">Game Menu</h2>

                <div className="mt-4">
                    <h2 className="sm:text-sm lg:text-lg h-10"><b>Difficulté :</b> {selectedLevel}</h2>
                    <input
                        onChange={handleRangeChange}
                        type="range"
                        min={0}
                        max={100}
                        value={getRangeValue(selectedLevel)}
                        className="range range-success range-xs mt-3" 
                        step="50"
                    />
                    <div className="w-full flex justify-between text-xs px-2">
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                    </div>

                    <div className='flex flex-col'>
                        {selectedLevel === 'Chill' &&
                            <>
                            <div className="mt-4 flex flex-col items-center">
                                <p className="flex items-center lg:text-3xl text-xl font-bold justify-center h-[120px]">
                                    Photo<ImArrowRight style={{ marginLeft: '10px', marginRight: '10px' }} />
                                    Nom commun
                                </p>
                            </div>
                            </>
                        }
                        {selectedLevel === 'Entrainement' &&
                            <>
                            <div className="mt-4 flex flex-col items-center">
                                <p className="flex items-center lg:text-3xl text-md font-bold justify-center h-[120px]">Photo
                                    <ImArrowRight style={{ marginLeft: '10px', marginRight: '10px' }} />
                                    <div className="flex flex-col text-md font-bold ml-8">
                                        <p>1. Nom commun</p>
                                        <p>2. Famille</p>
                                        <p>3. Genre</p>
                                        <p>4. Espèce</p>
                                        <p>5. Cultivar</p>
                                    </div>
                                </p>
                            </div>
                            </>
                        }
                        {selectedLevel === 'Qui veut gagner des graines en masse ?' &&
                            <>
                            <div className="mt-4 flex flex-col items-center">
                                <p className="flex flex-col items-center lg:text-3xl text-xl text-center font-bold justify-center h-[120px]">Photo
                                    <ImArrowDown style={{ marginTop: '10px', marginBottom: '10px' }} />
                                        <h3>4 choix pour chaque élément</h3>
                                </p>
                            </div>
                            </>
                        }
                    </div>
                </div>

                <div className="multi-select-dropdown mx-auto">
                    <div className="dropdown dropdown-right">
                            
                        <label tabIndex={0} className="btn w-32">Groupes<BiSolidDownArrow/></label>
                        <ul tabIndex={0} className="dropdown-content max-h-40 z-[1] menu p-2 shadow bg-base-100 rounded-box">
                        <div className='overflow-y-scroll'>
                            <button
                                onClick={handleSelectAll}
                                className="btn btn-sm text-[10px] btn-outline border-emerald-600 hover:bg-emerald-600 hover:border-emerald-600 text-emerald-600"
                            >
                                Tout sélectionner
                            </button>
                            <button
                                onClick={handleSelectNone}
                                className="btn btn-sm text-[10px] mt-1 btn-outline border-emerald-600 hover:bg-emerald-600 hover:border-emerald-600 text-emerald-600"
                            >
                                Tout désélectionner
                            </button>
                            {['1', '2', '3', '4', '5', '6'].map((item) => (
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
                        </ul>
                    </div>
                </div>
                
                {selectedItems.length < 1 ? (
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
