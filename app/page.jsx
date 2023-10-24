"use client"
import Link from "next/link";

export default function Home() {
  
  return (
    <div className="hero min-h-screen" style={{backgroundImage: 'url(https://images.pexels.com/photos/68507/spring-flowers-flowers-collage-floral-68507.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)'}}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="">
          <h1 className="mb-5 text-5xl lg:text-8xl text-white font-bold">Vegetal Reco&apos;</h1>
        </div>
      </div>
      <Link href="/gameMenu" className="btn mt-60 w-[30%] lg:fixed lg:bottom-40 lg:w-96 btn-outline border-white hover:bg-emerald-600 hover:border-emerald-600 text-white">Jouer</Link>
    </div>
  );
}
