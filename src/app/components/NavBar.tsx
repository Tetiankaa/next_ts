'use client'

import {useSession} from "next-auth/react";
import Link from "next/link";

const NavBar = () => {
    const {data:session} = useSession();


    return (
      <nav className={'bg-black fixed p-4'}>
          <div className={'container mx-auto'}>
                <ul className={'flex justify-around h-screen flex-col'}>
                    <div className={'one'}>
                        <li className={'mx-4 mt-5'}>
                            <Link href={'/'} className={'text-white font-bold'}>Home</Link>
                        </li>
                        <li className={'mx-4 mt-5'}>
                            <Link href={'/dashboard'} className={'text-white font-bold'}>Dashboard</Link>
                        </li>
                    </div>
<hr/>
                    <div className={'auth'}>
                        <div>
                            <li className={'mx-4 mt-10'}>
                                <Link href={'/login'} className={'text-white font-bold'}>Login</Link>
                            </li>

                            <li className={'mx-4 mt-5'}>
                                <Link href={'/register'} className={'text-white font-bold'}>Register</Link>
                            </li>
                        </div>
                    </div>
                </ul>
          </div>

      </nav>
    );
};

export default NavBar;