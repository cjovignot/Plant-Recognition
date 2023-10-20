"use client"
import React, { useEffect, useState } from 'react';

export default function Table({data}) {
    console.log(data)

    return (
        <>
        <div className="my-20">
            <table className="table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Nom commun</th>
                        <th>Réponse</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((plant, index) => (
                        <tr key={index}>
                            <td>
                                <div className="flex items-center space-x-3">
                                    <div className="avatar">
                                            <div className="w-12 rounded-full" style={{
                                                backgroundImage:`url(${plant.imageUrl[0]})`,
                                                backgroundPosition: "center",
                                                backgroundSize: "cover"
                                            }}></div>
                                    </div>
                                </div>
                            </td>
                            <td>{plant.name}</td>
                            <td className='text-red-700	'>{plant.answer.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
}
