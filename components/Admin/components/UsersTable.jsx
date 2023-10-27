"use client"
import React, { useEffect, useState } from 'react';
import formatDate from '../../../app/utils/users/users'

export default function Table(data, onRoleChange) {
    const [users, setUsers] = useState([])
    const [inscriptionDisplayed, setInscriptionDisplayed] = useState(true)
    const [gamesDisplayed, setGamesDisplayed] = useState(false)
    const [avgScoreDisplayed, setAvgScoreDisplayed] = useState(false)

    useEffect(() => {
        setUsers(data.data)
    }, [data])


    return (
        <>
        <div className="mt-16 mb-20">
            <div className="flex justify-center mb-4 border-b border-[#059669] pb-1">
                {/* <button
                    onClick={() => setInscriptionDisplayed(!inscriptionDisplayed)}
                    className={`btn btn-sm rounded-full m-1 btn-ghost border-4 text-black ${inscriptionDisplayed ? 'border-[#059669] border-4 text-[#059669]' : ''}`} 
                >
                    Inscription
                </button> */}
                <button
                    onClick={() => setGamesDisplayed(!gamesDisplayed)}
                    className={`btn btn-sm rounded-full m-1 btn-ghost border-4 text-black ${gamesDisplayed ? 'border-[#059669] border-4 text-[#059669]' : ''}`} 
                >
                    Parties
                </button>
                <button
                    onClick={() => setAvgScoreDisplayed(!avgScoreDisplayed)}
                    className={`btn btn-sm rounded-full m-1 btn-ghost border-4 text-black ${avgScoreDisplayed ? 'border-[#059669] border-4 text-[#059669]' : ''}`} 
                >
                    Scores
                </button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Pseudo</th>
                        {inscriptionDisplayed && <th>Inscription</th>}
                        {gamesDisplayed && <th>Parties jouées</th>}
                        {avgScoreDisplayed && <th>Score moyen</th>}
                        <th>Admin</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length === 0 ? (
                        // This is the conditional rendering for the spinner
                        <tr>
                            <td colSpan="6" className="text-center">
                                <span className="loading loading-spinner text-success w-10 h-10"></span>
                            </td> 
                        </tr>
                    ) : (
                        users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.pseudo}</td>
                                {inscriptionDisplayed && <td className='text-[10px]'>{formatDate(user.inscription)}</td>}
                                {gamesDisplayed && <td className='text-[10px]'>Nb parties</td>}
                                {avgScoreDisplayed && <td className='text-[10px]'>Score moyen</td>}
                                <td className='text-[10px]'>
                                    <input 
                                        type="checkbox" 
                                        className="checkbox" 
                                        checked={user.role === 'admin'} 
                                        onChange={(e) => onRoleChange(user.id, e.target.checked)} 
                                    />
                                </td>
                                <td className='text-[10px]'>
                                    <button className='btn btn-sm btn-ghost'>📧</button>
                                    <button className='btn btn-sm btn-ghost'>❌</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
        </>
    );
}
