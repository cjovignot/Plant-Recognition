"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import Level1 from './components/Level1';
import Level2 from './components/Level2';
import Level3 from './components/Level3';

export default function LevelsRender(params) {
    const {level} = params.level
    const decodedLevel = decodeURIComponent(level);
  
    return (
      <>
        {decodedLevel === "Chill" &&
            <Level1 params={params}/>
        }
        {decodedLevel === "Entrainement" &&
            <Level2 params={params}/>
        }
        {decodedLevel === "Qui veut gagner des graines en masse ?" &&
            <Level3 params={params}/>
        }
      </>
    );
}
