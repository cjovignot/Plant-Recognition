"use client";

import { useRouter } from "next/navigation";
import PlantList from '@/components/PlantList'

export default function Settings() {
  const router = useRouter();


  if (!localStorage.getItem('client')) {
    router.push("/");
  }

  return (
    <div className="mx-8">
        <PlantList/>
    </div>
  );
}
