"use client"

import Link from "next/link";
import { useState } from 'react';

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };
  return (
    <>
      <div className="navbar bg-emerald-600	top-0 text-white fixed h-20 z-10">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0}
              onClick={toggleDropdown}
              className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </label>
            {dropdownOpen && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black"
              >
                <li onClick={closeDropdown}>
                    <Link href="/settings">Végétaux</Link>
                </li>
              </ul>
            )}
          </div>
        </div>
        <div className="navbar-center">
          <Link href="/" className="btn btn-ghost normal-case text-xl">Vegetal Reco&apos;</Link>
        </div>
        <div className="navbar-end">
        </div>
      </div>

      {/* <nav className="flex justify-between items-center bg-slate-800 px-8 py-3">
        <Link className="text-white font-bold" href={"/"}>
          GTCoding.
        </Link>
        <Link className="bg-white p-2" href={"/addTopic"}>
          Add Topic
        </Link>
      </nav> */}
    </>
  );
}
