import React from "react";
import Image from "next/image";

const MyProfilePics = () => {

    return (
     <section className={'w-full mx-auto'}>
         <Image
             className="border-4 border-slate-500 drop-shadow-xl shadow-black rounded-full mx-auto mt-8"
             src='/images/flower.jpg'
             alt={'tetiana korsun'}
             width={200}
             height={200}
             priority={true}
         />
     </section>
    );
};

export default MyProfilePics;