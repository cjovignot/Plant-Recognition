"use client";

import { useRouter } from "next/navigation";
import Users from '@/components/Admin/components/UsersTable';
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

const updateUser = async (id, newRole) => {
  try {
      const res = await fetch(`/api/users/${id}`, {
          method: "PUT",
          headers: {
              "Content-type": "application/json",
          },
          body: JSON.stringify({ role: newRole }),
      });

      if (!res.ok) {
          throw new Error("Failed to update user");
      }
      loadUsers();
  } catch (error) {
      console.log(error);
  }
}


export default function UsersTable() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const router = useRouter();

  const loadUsers = async () => {
    const result = await getUsers();
    setUsers(result.users || []);
    setFilteredUsers(result.users || []);
  };

  const handleSearch = (query) => {
    const searchResult = users.filter(user => user.pseudo.toLowerCase().includes(query.toLowerCase()));
    setFilteredUsers(searchResult);
  };

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
  
  useEffect(() => {
    // Check localStorage inside useEffect
    const client = localStorage.getItem('client');
    setIsLoggedIn(!!client); // Convert to boolean and set state

    if (!client) {
      router.push("/");
    }
  }, []);

  
  const handleRoleChange = async (userId, isChecked) => {
    const newRole = isChecked ? 'admin' : 'user';
    // You can call updateUser here, but make sure it accepts the necessary parameters
    updateUser(userId, newRole);
  }

  return (
    <div className="mx-8">
        <Users data={users} onRoleChange={handleRoleChange}/>
    </div>
  );
}
