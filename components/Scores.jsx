"use client"
import React, { useEffect, useState } from 'react';
import Donut from '@/components/Charts/Donut';
import Table from '@/components/Table'

export default function Scores({ trueArray, falseArray }) {
    const series = [trueArray.length, falseArray.length]

    return (
        <>      
            <div className="flex justify-center items-center m-auto lg:pt-20">
                <div className="bg-base-100 shadow-xl lg:rounded-lg">
                    <div className="flex flex-col h-screen lg:h-[600px] w-screen lg:max-w-[1000px] justify-between p-1">
                        <div className="flex flex-col items-center overflow-y-scroll overflow-x-hidden">
                            <h2 className="pt-20 card-title text-2xl">Résultats</h2>
                            <div>
                                <Donut series={series}/>
                                <Table data={falseArray}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
