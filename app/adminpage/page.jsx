"use client";

import { useRouter } from "next/navigation";
import Users from '@/components/Admin/components/UsersTable';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

const getUsers = async () => {
  try {
    // const res = await fetch(`${process.env.NEXT_PUBLIC_ROOTPATH}/api/plants`, {
      const res = await fetch(`/api/users`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch plants");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading plants: ", error);
  }
};

const updateRole = async (id, user, newRole) => {
  console.log(id, newRole)
  try {
      const res = await fetch(`/api/users/${id}`, {
          method: "PUT",
          headers: {
              "Content-type": "application/json",
          },
          body: JSON.stringify({ role: newRole }),
      });
      toast.success(`${user} est désormais ${newRole} !`)
      if (!res.ok) {
        toast.error(`Echec de la mise à niveau..`)
        throw new Error("Failed to update user");
      }
  } catch (error) {
      console.log(error);
  }
}


export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [role, setRole] = useState('')

  const router = useRouter();

  useEffect(() => {
    // Check localStorage inside useEffect
    const client = localStorage.getItem('client');
    setIsLoggedIn(!!client); // Convert to boolean and set state

    if (client) {
      const role = localStorage.getItem('role');
      setRole(role)
      if (role !== 'admin') {
        router.push("/");
      }
    }

    if (!client) {
      router.push("/");
    }
  }, []);

  // const handleSearch = (query) => {
  //   const searchResult = users.filter(user => user.pseudo.toLowerCase().includes(query.toLowerCase()));
  //   setFilteredUsers(searchResult);
  // };

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const result = await getUsers();
      setUsers(result.users || []);
    }

    fetchData();
  }, []);

  
  // Load users from API and update state
  const loadUsers = async () => {
    const result = await getUsers();
    setUsers(result.users || []);
    // setFilteredPlants(result.plants || []);
  };

  return (
    <div className="mx-8">
      {role === 'admin' ? (
        <Users data={users} updateRole={updateRole} onUserDeleted={loadUsers}/>
      ) : (
        <div className="flex w-full h-[80vh] justify-center items-center">
          <span className="loading loading-spinner text-success w-16 h-16"></span>
        </div>
      )}
    </div>
  );
}
