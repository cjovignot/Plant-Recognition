"use client"

import { useEffect, useState } from 'react';
import Link from "next/link";
import Login from '@/components/Login';
import SignUp from '@/components/SignUp';
import { RiAccountCircleLine } from 'react-icons/ri';
import { FaUserCircle } from 'react-icons/fa';
import { PiPlantDuotone } from 'react-icons/pi';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { FcAbout } from 'react-icons/fc';
import { LuSettings } from 'react-icons/lu';
import { HiOutlinePlus } from 'react-icons/hi';
import { TbLogin2, TbLogout2 } from 'react-icons/tb';
import { FcStatistics } from 'react-icons/fc';
import AddPlant from './AddPlant';
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [pseudo, setPseudo] = useState("")

  const router = useRouter();
  
  useEffect(() => {
    // Check localStorage inside useEffect
    const client = localStorage.getItem('client');
    setPseudo(client?.substring(0, 1).toUpperCase())
    const role = localStorage.getItem('role');

    if(role === 'admin' || role === 'sysadmin') {
      setIsAdmin(true); // Convert to boolean and set state
    }
    setIsLoggedIn(!!client); // Convert to boolean and set state
  }, [isLoggedIn]);

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
      <div className="navbar bg-emerald-600	top-0 text-white fixed z-20 !min-h-[2rem]">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0}
              onClick={toggleDropdown}
              className="btn btn-sm btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </label>
            {dropdownOpen && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52 text-black"
              >
                <li onClick={closeDropdown}>
                  {isLoggedIn &&
                  <>
                    <Link className='btn btn-ghost btn-sm flex justify-start text-[11px] items-center' href="/settings"><PiPlantDuotone size={20}/>Végétaux</Link>
                  </>
                  }
                  <Link className='btn btn-ghost btn-sm flex justify-start text-[11px] items-center' href="/"><FcAbout size={20}/>A propos</Link>
                </li>
              </ul>
            )}
          </div>
        </div>
        <div className="navbar-center">
          <Link href="/" className="btn btn-sm btn-ghost normal-case text-xl">Vegetal Reco&apos;</Link>
        </div>

        <Login onUserLogin={handleUserLogin}/>
        <SignUp/>
        <div className="navbar-end">
          <div className="dropdown dropdown-end flex items-center">
            {isLoggedIn ? (
              <>
              <div className="avatar placeholder mr-2 ring ring-success ring-offset-1 rounded-full">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-7">
                  <span className="text-lg font-bold">{pseudo}</span>
                </div>
              </div>
              </>
            ) : (
              <>
              <div className="avatar placeholder mr-2 ring ring-base-300 ring-offset-1 rounded-full">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-7">
                  <span className="text-lg font-bold"></span>
                </div>
              </div>
              </>
            )
            }
            <label tabIndex={0} className="btn btn-sm btn-ghost btn-circle"><LuSettings size={20} /></label>
            <ul tabIndex={0} className="dropdown-content mt-36 menu p-2 shadow bg-base-100 rounded-box w-52 text-black divide-y divide-solid">
              {!isLoggedIn ? (
                <>
                <li>
                  <button onClick={()=>document.getElementById('my_modal_login').showModal()}>
                    <TbLogin2 size={20}/>Login
                  </button>
                </li>
                </>
              ) : (
                <>
                <li>
                  <button
                    onClick={()=> {
                      localStorage.removeItem('client')
                      localStorage.removeItem('role')
                      setIsLoggedIn(false)
                      setPseudo("")
                      router.push("/");
                    }
                    }><TbLogout2 size={20}/>Logout</button>
                </li>
                </>
              )}
              {isLoggedIn &&
              <>
                <li>
                  <button>
                    <FcStatistics size={20}/>🚧 Statistiques 🚧
                  </button>
                </li>
                {isAdmin &&
                  <li>
                    <Link className='btn btn-ghost btn-sm flex justify-start text-[11px] items-center' href="/adminpage">
                      <MdOutlineAdminPanelSettings size={20} />🚧 Administration
                    </Link>
                  </li>
                }
              </>
              }
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
