"use client";

import { useState } from "react";
import GameMenu from '@/components/GameMenu'
import Link from "next/link";

export default function Settings() {

  return (
    <div className="hero min-h-screen" style={{backgroundImage: 'url(https://images.pexels.com/photos/68507/spring-flowers-flowers-collage-floral-68507.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)'}}>
      <div className="hero-overlay bg-opacity-60"></div>
    <div className="h-screen flex flex-wrap justify-center items-center m-auto">
        <GameMenu/>
    </div>
    </div>
  );
}
