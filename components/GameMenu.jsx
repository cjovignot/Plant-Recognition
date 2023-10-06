"use client";
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { ImArrowRight } from 'react-icons/im';
import { ImArrowDown } from 'react-icons/im';


export default function GameMenu() {
    const levels = ['Chill', 'Entrainement', 'Qui veut gagner des graines en masse ?']
    const [selectedLevel, setSelectedLevel] = useState(levels[0]);

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
    <div className="card lg:card-side bg-base-100 shadow-xl">
        <div className="card-body h-128 min-w-[550px]">
            <h2 className="text-center text-4xl font-bold">Game Menu</h2>

            <div className="mt-4">
                <h2 className="text-lg"><b>Difficulté :</b> {selectedLevel}</h2>
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
            </div>

            {selectedLevel === 'Chill' &&
                <div className="mt-4 flex flex-col items-center">
                    <p className="flex items-center text-3xl font-bold justify-center h-[200px]">
                        Photo<ImArrowRight style={{ marginLeft: '10px', marginRight: '10px' }} />
                        Nom commun
                    </p>
                    <Link href="/level1" className="btn btn-outline border-emerald-600 hover:bg-emerald-600 hover:border-emerald-600 text-emerald-600">Jouer</Link>
                </div>
            }
            {selectedLevel === 'Entrainement' &&
                <div className="mt-4 flex flex-col items-center">
                    <p className="flex items-center text-3xl font-bold justify-center h-[230px]">Photo
                        <ImArrowRight style={{ marginLeft: '10px', marginRight: '10px' }} />
                        <div className="flex flex-col text-xl font-bold ml-8">
                            <p>1. Nom commun</p>
                            <p>2. Famille</p>
                            <p>3. Genre</p>
                            <p>4. Espèce</p>
                            <p>5. Cultivar</p>
                        </div>
                    </p>
                    <Link href="/level2" className="btn btn-outline border-emerald-600 hover:bg-emerald-600 hover:border-emerald-600 text-emerald-600">Jouer</Link>
                </div>
            }
            {selectedLevel === 'Qui veut gagner des graines en masse ?' &&
                <div className="mt-4 flex flex-col items-center">
                    <p className="flex flex-col items-center text-3xl font-bold justify-center h-[200px]">Photo
                        <ImArrowDown style={{ marginTop: '10px', marginBottom: '10px' }} />
                            <h3>4 choix pour chaque élément</h3>
                    </p>
                    <Link href="/level3" className="btn btn-outline border-emerald-600 hover:bg-emerald-600 hover:border-emerald-600 text-emerald-600">Jouer</Link>
                </div>
            }


            <div className="card-actions justify-end">
                {/* <button className="btn btn-primary">Listen</button> */}
            </div>
        </div>
    </div>
    </>
  );
}
