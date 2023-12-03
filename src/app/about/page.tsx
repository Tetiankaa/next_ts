import React from "react";
import Link from "next/link";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'About'
}
const AboutPage = () => {
        // throw new Error('error');
    return (
        <div>
            <h1>About page</h1>
            <Link href={'/'}>Go to Home</Link>
        </div>
    );
};

export default AboutPage;