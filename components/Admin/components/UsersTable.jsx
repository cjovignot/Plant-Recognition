"use client"
import React, { useEffect, useState } from 'react';
import formatDate, { USER_ROLES } from '../../../app/utils/users/users';
import DeleteUser from '@/components/DeleteUser';

export default function Table(data, {onUserDeleted}) {
    const [users, setUsers] = useState([])
    const [inscriptionDisplayed, setInscriptionDisplayed] = useState(false)
    const [gamesDisplayed, setGamesDisplayed] = useState(false)
    const [avgScoreDisplayed, setAvgScoreDisplayed] = useState(false)
    const [newRole, setNewRole] = useState('');

    useEffect(() => {
        setUsers(data.data)
    }, [data])


    return (
        <>
        <div className="mt-16 mb-20">
            <div className="flex justify-center mb-4 border-b border-[#059669] pb-1">
                <button
                    onClick={() => setInscriptionDisplayed(!inscriptionDisplayed)}
                    className={`btn btn-sm rounded-full m-1 btn-ghost border-4 text-black ${inscriptionDisplayed ? 'border-[#059669] border-4 text-[#059669]' : ''}`} 
                >
                    Inscription
                </button>
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
                    {users.lenght === 0 ? (
                        // This is the conditional rendering for the spinner
                        <tr>
                            <td colSpan="6" className="text-center">
                                <span className="loading loading-spinner text-success w-10 h-10"></span>
                            </td> 
                        </tr>
                    ) : (
                        users?.map((user, index) => (
                            <tr key={index}>
                                <td>{user.pseudo}</td>
                                {inscriptionDisplayed && <td className='text-[10px]'>{formatDate(user.inscription)}</td>}
                                {gamesDisplayed && <td className='text-[10px]'>Nb parties</td>}
                                {avgScoreDisplayed && <td className='text-[10px]'>Score moyen</td>}
                                <td className='text-[10px]'>
                                <select 
                                    className="select select-sm select-bordered lg:w-full w-fit"
                                    value={user.role} // Set the current value to user's role
                                    onChange={(e) => {
                                        const updatedUsers = [...users];
                                        updatedUsers[index].role = e.target.value;
                                        setUsers(updatedUsers);
                                        // Optionally call a function to update the role in your backend or wherever needed.
                                        data.updateRole(user._id, user.pseudo, e.target.value); 
                                    }}
                                >
                                    <option disabled>Role</option>
                                    {USER_ROLES.map((groupValue) => (
                                        <option key={groupValue} value={groupValue}>
                                            {groupValue}
                                        </option>
                                    ))}
                                </select>
                                </td>
                                <td className='flex text-[10px]'>
                                    <button className='btn btn-sm btn-ghost'>📧</button>
                                    <DeleteUser id={user._id} onUserDeleted={onUserDeleted}/>
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
