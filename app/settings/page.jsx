"use client";

import { useState } from "react";
import PlantList from '@/components/PlantList'

export default function AddPlant() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [family, setFamily] = useState("")

  return (
    <div className="mx-8">
        <PlantList/>
    </div>
  );
}
