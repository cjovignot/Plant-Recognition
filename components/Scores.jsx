"use client"
import React, { useEffect, useState } from 'react';
import Donut from '@/components/Charts/Donut'

export default function Scores({ trueArray, falseArray }) {
    console.log("correct", trueArray)
    console.log("false", falseArray)
    

    const series = [trueArray.length, falseArray.length];
    
    return (
        <>      
            <div className="h-screen flex justify-center items-center m-auto lg:pt-20">
            <div className="bg-base-100 shadow-xl lg:rounded-3xl">
                <div className="flex flex-col h-screen lg:h-[600px] w-screen lg:max-w-[1000px] justify-between">
                    <div className="flex flex-col justify-around items-center pb-10">
                    <h2 className="pt-20 card-title text-2xl">Résultats</h2>
                    <p>{trueArray.length}/{falseArray.length}</p>

                    <Donut series={series}/>
                    </div>
                </div>
            </div>
            </div>
        </>
    );
}
