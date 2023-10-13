"use client"

import { useEffect, useState } from 'react';
import Link from "next/link";
import Login from '@/components/Login';
import SignUp from '@/components/SignUp';
import { RiAccountCircleLine } from 'react-icons/ri';
import { PiPlantDuotone } from 'react-icons/pi';
import { FcAbout } from 'react-icons/fc';

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  useEffect(() => {
    // Check localStorage inside useEffect
    const client = localStorage.getItem('client');
    setIsLoggedIn(!!client); // Convert to boolean and set state
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const handleUserLogin = (pseudo) => {
    setIsLoggedIn(pseudo);
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
                  {localStorage.getItem('client') &&
                    <Link className='btn btn-ghost btn-sm flex justify-start' href="/settings"><PiPlantDuotone size={25}/>Végétaux</Link>
                  }
                  <Link className='btn btn-ghost btn-sm flex justify-start' href="/"><FcAbout size={25}/>A propos</Link>
                </li>
              </ul>
            )}
          </div>
        </div>
        <div className="navbar-center">
          <Link href="/" className="btn btn-ghost normal-case text-xl">Vegetal Reco&apos;</Link>
        </div>

        <div className="navbar-end">
          {!isLoggedIn ? (
            <>
            <button className="btn btn-ghost" onClick={()=>document.getElementById('my_modal_login').showModal()}><RiAccountCircleLine size={25}/>Login</button>
            <Login onUserLogin={handleUserLogin}/>
            <SignUp/>
            </>
          ) : (
            <>
            <button className="btn btn-ghost"
              onClick={()=> {
                localStorage.removeItem('client')
                setIsLoggedIn(false)
              }
              }><RiAccountCircleLine size={25}/>Logout</button>
            </>
          )
          }
        </div>
      </div>
    </>
  );
}
