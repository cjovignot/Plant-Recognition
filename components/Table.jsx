"use client"
import React, { useEffect, useState } from 'react';

export default function Table({data, level}) {

    const redCount = data.reduce((acc, plant) => {
        if (plant.answer.name !== plant.name) acc++;
        if (plant.answer.family !== plant.family) acc++;
        if (plant.answer.genre !== plant.genre) acc++;
        if (plant.answer.species !== plant.species) acc++;
        if (plant.answer.cultivar !== plant.cultivar) acc++;
        return acc;
    }, 0);

    const itemsDisplayedCount = data.reduce((acc, plant) => {
        acc += 1; // for plant.name
        if (level !== 'Entrainement') acc += 4; // for family, genre, species, and cultivar
        return acc;
    }, 0);
    const percentage = (((itemsDisplayedCount - redCount) / itemsDisplayedCount) * 100).toFixed(2);


    return (
        <>
        <div className="mt-10 mb-20">
            
            <div className='text-xl text-center mb-5'>Taux de réussite : {percentage}%</div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Nomenclatures</th>
                        <th>Réponses</th>
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
                            <td className='text-[10px]'>
                                <b>{plant.name}</b><br></br>
                                {level !== 'Entrainement' &&
                                <>
                                    {plant.family}<br></br>
                                    <i>{plant.genre}</i><br></br>
                                    <i>{plant.species}</i><br></br>
                                    {plant.cultivar}<br></br>
                                </>
                                }
                            </td>
                            <td className='text-[10px]'>
                                <b style={{ color: plant.answer.name !== plant.name ? 'red' : 'green' }}>
                                    {plant.answer.name}
                                </b><br></br>
                                {level !== 'Entrainement' &&
                                <>
                                    <span style={{ color: plant.answer.family !== plant.family ? 'red' : 'green' }}>
                                        {plant.answer.family}
                                    </span><br></br>
                                    <i style={{ color: plant.answer.genre !== plant.genre ? 'red' : 'green' }}>
                                        {plant.answer.genre}
                                    </i><br></br>
                                    <i style={{ color: plant.answer.species !== plant.species ? 'red' : 'green' }}>
                                        {plant.answer.species}
                                    </i><br></br>
                                    <span style={{ color: plant.answer.cultivar !== plant.cultivar ? 'red' : 'green' }}>
                                        {plant.answer.cultivar}
                                    </span><br></br>
                                </>
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
}
