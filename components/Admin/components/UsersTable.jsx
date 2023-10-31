"use client"
import React, { useEffect, useState } from 'react';
import formatDate, { USER_ROLES } from '../../../app/utils/users/users';
import { HiOutlineTrash } from "react-icons/hi";
// import DeleteUser from '@/components/DeleteUser';

export default function Table({ users, updateRole, onUserDeleted }) {
    const [inscriptionDisplayed, setInscriptionDisplayed] = useState(false)
    const [gamesDisplayed, setGamesDisplayed] = useState(false)
    const [avgScoreDisplayed, setAvgScoreDisplayed] = useState(false)
    const [newRole, setNewRole] = useState('');
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [userDeletedTrue, setUserDeletedTrue] = useState(false)
  
    const handleConfirm = async () => {
        if (selectedUserId) {
            const res = await fetch(`/api/users?id=${selectedUserId}`, {
                method: "DELETE",
            });
    
            if (res.ok) {
                // Call onUserDeleted with the selectedUserId after successful deletion
                if (onUserDeleted) {
                    onUserDeleted()
                }
                setUserDeletedTrue(false)
                setShowModal(false);
                setSelectedUserId(null); // Reset the selected user ID
            } else {
                // Handle the error appropriately
                console.error("Failed to delete the user");
            }
        } else {
            // Handle the case where selectedUserId is null or undefined
            console.error("No user selected for deletion");
        }
    };

    const handleDeleteClick = (userId) => {
        setUserDeletedTrue(true)
        setSelectedUserId(userId);
        setShowModal(true);
    };

    return (
        <>
        <div className="mt-12 mb-20">
            <div className="mt-16 flex justify-center mb-4 border-b border-[#059669] pb-1">
                <button
                    onClick={() => setInscriptionDisplayed(!inscriptionDisplayed)}
                    className={`btn btn-sm rounded-full m-1 btn-ghost border-4 text-black dark:text-white ${inscriptionDisplayed ? 'border-[#059669] border-4 text-[#059669]' : ''}`} 
                >
                    Inscription
                </button>
                <button
                    onClick={() => setGamesDisplayed(!gamesDisplayed)}
                    className={`btn btn-sm rounded-full m-1 btn-ghost border-4 text-black dark:text-white ${gamesDisplayed ? 'border-[#059669] border-4 text-[#059669]' : ''}`} 
                >
                    Parties
                </button>
                <button
                    onClick={() => setAvgScoreDisplayed(!avgScoreDisplayed)}
                    className={`btn btn-sm rounded-full m-1 btn-ghost border-4 text-black dark:text-white ${avgScoreDisplayed ? 'border-[#059669] border-4 text-[#059669]' : ''}`} 
                >
                    Scores
                </button>
            </div>
            <table className="table dark:text-white w-auto m-auto">
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
                        users?.map((user, index) => (
                            <tr key={index}>
                                <td>{user.pseudo}</td>
                                {inscriptionDisplayed && <td className='text-[10px]'>{formatDate(user.inscription)}</td>}
                                {gamesDisplayed && <td className='text-[10px]'>Nb parties</td>}
                                {avgScoreDisplayed && <td className='text-[10px]'>Score moyen</td>}
                                <td className='text-[10px]'>
                                <select 
                                    className="select select-sm select-bordered lg:w-full w-fit"
                                    value={user.role}
                                    onChange={(e) => {
                                        const updatedRole = e.target.value;
                                        // Call the passed-in updateRole function with the necessary parameters
                                        updateRole(user._id, user.pseudo, updatedRole);
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
                                    {/* <DeleteUser size={20} id={user._id} onUserDeleted={onUserDeleted}/> */}
                                    
                                    <>                                          
                                    {/* Delete button with onClick event calling handleDeleteClick with user's id */}
                                    <button onClick={() => handleDeleteClick(user._id)}
                                        className='btn btn-sm btn-ghost text-red-400'>
                                        <HiOutlineTrash size={18} />
                                    </button>
                                    </>
                                </td>
                            </tr>
                        ))
                        )}
                </tbody>
            </table>
        </div>
        
        {showModal && (
            <dialog open className="modal modal-middle sm:modal-middle">
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="modal-box">
                <h3 className="font-bold text-lg text-center">Confirmer la suppression ?</h3>
                <div className="modal-action flex justify-between">
                <button onClick={() => setShowModal(false)} className="bg-red-600 font-bold text-white py-3 px-6 rounded-lg">Annuler</button>
                <button onClick={handleConfirm} className="bg-green-600 font-bold text-white py-3 px-6 rounded-lg">Confirmer</button>
                </div>
            </div>
            </dialog>
        )}
        </>
    );
}
