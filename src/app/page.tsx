'use client'

import {useSession} from "next-auth/react";
import Link from "next/link";

const Home = () => {
    const {data:session} = useSession();

    return !session ?(
        <div className={'flex min-h-screen flex-col items-center justify-between p-24'}>
            <Link href={'/login'} className={'border px-4 py-2 text-red-400 rounded'}>Please login to see the content.</Link>
        </div>
    ) :(
        <div className={'flex min-h-screen flex-col items-center justify-between p-24'}>
            <p className={'text-green-400 border p-5'}>Hello</p>
        </div>
    )
};

export default Home;