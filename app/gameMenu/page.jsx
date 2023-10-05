"use client";

import { useState } from "react";
import Link from "next/link";

export default function Settings() {

  return (
    <div className="hero min-h-screen" style={{backgroundImage: 'url(https://images.pexels.com/photos/68507/spring-flowers-flowers-collage-floral-68507.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)'}}>
      <div className="hero-overlay bg-opacity-60"></div>
    <div className="pt-32 h-screen flex flex-wrap justify-center items-center m-auto">
        <div className="card w-96 h-128 bg-base-100 shadow-xl m-8">
        <figure><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_zhEzXEHxYu_RB05zlkJbnrWH4RME42hJsEPvxMUy_Ub8WLuIStfyYXFXBie1ZuPw2SA&usqp=CAU"/></figure>
          <div className="card-body">
            <h2 className="card-title text-2xl flex justify-center">DECOUVERTE</h2><br/>
            <p><b>Teste tes connaissances sur les points suivant :</b>
              <li>Nom commun</li>
              <li>Famille</li>
              <li>Espèce</li>
              <li>Cultivar</li>
            </p>
            <div className="card-actions justify-end">
              <Link href="/level1" className="btn btn-outline border-emerald-600 hover:bg-emerald-600 hover:border-emerald-600 text-emerald-600">Jouer</Link>
            </div>
          </div>
        </div>

        
        <div className="card w-96 h-128 bg-base-100 shadow-xl m-8">
        <figure><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeWcdwroHHVpKfdVvjJTvcqeaMbjizQ5b3PBQr5d7hu2HzPT-warPP6iumhzhWcMbkulQ&usqp=CAU"/></figure>
          <div className="card-body">
            <h2 className="card-title text-2xl flex justify-center">AMATEUR</h2><br/>
            <p><b>Teste tes connaissances sur les points suivant :</b>
              <li>Nom commun</li>
              <li>Famille</li>
              <li>Espèce</li>
              <li>Cultivar</li>
            </p>
            <div className="card-actions justify-end">
              <Link href="/level1" className="btn btn-outline border-emerald-600 hover:bg-emerald-600 hover:border-emerald-600 text-emerald-600">Jouer</Link>
            </div>
          </div>
        </div>

        
        <div className="card w-96 h-128 bg-base-100 shadow-xl m-8">
        <figure><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeWcdwroHHVpKfdVvjJTvcqeaMbjizQ5b3PBQr5d7hu2HzPT-warPP6iumhzhWcMbkulQ&usqp=CAU"/></figure>
          <div className="card-body">
            <h2 className="card-title text-2xl flex justify-center">PRO</h2><br/>
            <p><b>Teste tes connaissances sur les points suivant :</b>
              <li>Nom commun</li>
              <li>Famille</li>
              <li>Espèce</li>
              <li>Cultivar</li>
            </p>
            <div className="card-actions justify-end">
              <Link href="/level1" className="btn btn-outline border-emerald-600 hover:bg-emerald-600 hover:border-emerald-600 text-emerald-600">Jouer</Link>
            </div>
          </div>
        </div>
    </div>
    </div>
  );
}
