"use client";
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { ImArrowRight } from 'react-icons/im';
import { ImArrowDown } from 'react-icons/im';
import { BiSolidDownArrow } from 'react-icons/bi';


export default function GameMenu() {
    const levels = ['Chill', 'Entrainement', 'Qui veut gagner des graines en masse ?']
    const [selectedLevel, setSelectedLevel] = useState(levels[0]);
    const [selectedItems, setSelectedItems] = useState([]);

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
            <div className="card-body flex flex-col h-128 lg:min-w-[550px]">
                <h2 className="pt-20 lg:pt-0 text-center text-3xl lg:text-4xl font-bold">Game Menu</h2>

                <div className="mt-4">
                    <h2 className="sm:text-sm lg:text-lg"><b>Difficulté :</b> {selectedLevel}</h2>
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
                                <p className="flex items-center lg:text-3xl text-2xl font-bold justify-center h-[200px]">
                                    Photo<ImArrowRight style={{ marginLeft: '10px', marginRight: '10px' }} />
                                    Nom commun
                                </p>
                            </div>
                            </>
                        }
                        {selectedLevel === 'Entrainement' &&
                            <>
                            <div className="mt-4 flex flex-col items-center">
                                <p className="flex items-center lg:text-3xl text-2xl font-bold justify-center h-[200px]">Photo
                                    <ImArrowRight style={{ marginLeft: '10px', marginRight: '10px' }} />
                                    <div className="flex flex-col text-xl font-bold ml-8">
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
                                <p className="flex flex-col items-center lg:text-3xl text-2xl text-center font-bold justify-center h-[200px]">Photo
                                    <ImArrowDown style={{ marginTop: '10px', marginBottom: '10px' }} />
                                        <h3>4 choix pour chaque élément</h3>
                                </p>
                            </div>
                            </>
                        }
                    </div>
                </div>

                {selectedLevel === 'Chill' &&
                    <div className="flex flex-col card-actions items-center">
                    <div className="multi-select-dropdown">
                        <div className="dropdown dropdown-right">
                                
                            <label tabIndex={0} className="btn m-1">Groupes<BiSolidDownArrow/></label>
                            <ul tabIndex={0} className="dropdown-content max-h-40 z-[1] menu p-2 shadow bg-base-100 rounded-box">
                            <div className='overflow-y-scroll'>
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
                        <Link
                            href={{
                                pathname: '/level1',
                                query: { groups: selectedItems.join(",") }
                            }}
                            params={selectedItems}
                            className="btn btn-outline border-emerald-600 hover:bg-emerald-600 hover:border-emerald-600 text-emerald-600">
                            Jouer
                        </Link>
                    </div>
                }
                {selectedLevel === 'Entrainement' &&
                    <div className="flex flex-col card-actions items-center">
                        <select className="select select-bordered w-sm -mt-4 mb-2"
                        >
                            <option disabled selected>Groupe</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                        </select>
                        <Link href="/level2" className="btn btn-outline border-emerald-600 hover:bg-emerald-600 hover:border-emerald-600 text-emerald-600">Jouer</Link>
                    </div>
                }
                {selectedLevel === 'Qui veut gagner des graines en masse ?' &&
                    <div className="flex flex-col card-actions items-center">
                        <select className="select select-bordered w-sm -mt-4 mb-2"
                        >
                            <option disabled selected>Groupe</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                        </select>
                        <Link href="/level3" className="btn btn-outline border-emerald-600 hover:bg-emerald-600 hover:border-emerald-600 text-emerald-600">Jouer</Link>
                    </div>
                }
            </div>
        </div>
    </>
  );
}
