import React from "react";
import Feed from "@/app/components/Feed";

const Home = () => {
    return (
        <section className='w-full flex-center'>
            <h1 className='head_text'>
                Discover & Share
                <br className='max-md:hidden' />
                <span className='orange_gradient'> AI-Powered Prompts</span>
            </h1>
            <p className='desc'>
                Promptopia is an open-source AI prompting tool for modern world to
                discover, create and share creative prompts
            </p>
            <Feed/>
        </section>
    );
};

export default Home;