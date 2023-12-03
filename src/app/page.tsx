import Link from "next/link";
import React from "react";
import {Allura} from 'next/font/google'
import NavBar from "@/app/components/NavBar";

const allura = Allura({weight:"400",subsets:['latin']})
const Page = () => {
    return (
        <div className={allura.className}>
            {/*<div className={allura.className}>*/}
            {/*    <Link href={'/users'}>Users</Link>*/}
            {/*    <Link href={'/about'}>About</Link>*/}
            {/*</div>*/}
        </div>
    );
};

export default Page;