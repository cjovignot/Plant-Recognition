"use client";

import { useRouter } from "next/navigation";
import PlantList from '@/components/PlantList';
import { useEffect, useState } from 'react';

export default function Settings() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const router = useRouter();
  
  useEffect(() => {
    // Check localStorage inside useEffect
    const client = localStorage.getItem('client');
    setIsLoggedIn(!!client); // Convert to boolean and set state

    if (!client) {
      router.push("/");
    }
  }, []);

  return (
    <div className="mx-8">
        <PlantList/>
    </div>
  );
}
