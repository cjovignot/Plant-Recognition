"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import LevelRender from '@/components/Levels/Levels';

export default function Levels(req) {
  
    return (
      <>
      <div className="hero min-h-screen" style={{backgroundImage: 'url(https://images.pexels.com/photos/68507/spring-flowers-flowers-collage-floral-68507.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)'}}>
        <div className="hero-overlay bg-opacity-60"></div>
        <LevelRender level={req.params} groups={req.searchParams}/>
      </div>
      </>
    );
}
