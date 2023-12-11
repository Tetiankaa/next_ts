'use client'

import React, {useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import logo from '../../../public/assets/images/logo.svg'

import '../globals.css';
import {ClientSafeProvider, getProviders, LiteralUnion, signIn, signOut, useSession} from "next-auth/react";
// @ts-ignore
import {BuiltInProviderType} from "next-auth/providers";
const Nav = () => {

    const {data:session} = useSession();

    const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null);
    const [toggleDropDown, setToggleDropDown] = useState<boolean>(false);

    useEffect(() => {
        const fetchProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        };

        fetchProviders();
    }, []);


    return (
        <nav className={'flex-between pt-3 mb-16 w-full'}>
            <Link href={'/'} className={'flex gap-2 flex-center'}>
                <Image src={logo} alt={'logo'} width={30} height={30} className={'object-contain'}/>
                <p className={'logo_text'}>Promptopia</p>
            </Link>

            <div className={'sm:flex hidden'}>
                {session?.user
                    ? (
                        <>
                            <div className={'flex gap-3 md:gap-5'}>

                                <Link href={'/create-prompt'} className={'black_btn'}>Create Post</Link>

                            <button type={"button"} className={'outline_btn'} onClick={()=>signOut()}>Sign Out</button>

                            <Link href={'/profile'}>
                                {session.user.image &&   <Image src={session?.user?.image} alt={'profile photo'} width={60} height={60}
                                        className={'rounded-full'}/>}
                            </Link>

                            </div>
                        </>
                    )
                    : (<>
                        {providers &&
                            Object.values(providers).map(
                                provider=>(<button type={"button"} key={provider.name} onClick={()=>signIn(provider.id)} className={'black_btn'}>
                                    Sign In
                                          </button>))
                        }
                    </>)
                }
            </div>

            {/*Mobile version*/}
            <div className={'sm:hidden flex relative'}>
                {session?.user
                ? (
                    <div className={'flex'}>
                        {session.user.image && <Image src={session.user.image} alt={'profile photo'} width={45} height={45} className={'rounded-full'} onClick={()=>setToggleDropDown(prev=>!prev)}/>}
                        {toggleDropDown &&(
                            <div className={'dropdown'}>

                                <Link href={'/profile'} className={'dropdown_link'} onClick={()=>setToggleDropDown(false)}>My Profile</Link>
                                <Link href={'/create-prompt'} className={'dropdown_link'} onClick={()=>setToggleDropDown(false)}>Create Post</Link>

                                <button type={"button"} onClick={()=> {
                                    setToggleDropDown(false);
                                    signOut();
                                }}
                                className={'mt-5 w-full black_btn'}
                                >Sign Out</button>

                            </div>
                        )}
                    </div>

                    )
                : (<>
                        {providers &&
                            Object.values(providers).map(
                                provider=>(<button type={"button"} key={provider.name} onClick={()=>signIn(provider.id)} className={'black_btn'}>
                                    Sign In
                                </button>))
                        }
                    </>)
                }
            </div>
        </nav>
    );
};

export default Nav;