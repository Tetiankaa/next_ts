'use client'

import React, {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import Profile from "@/app/components/Profile";
import {Post} from "@/app/create-prompt/page";
import {useRouter, useSearchParams} from "next/navigation";
import {ObjectId} from "mongoose";

const MyProfile = () => {
    const {data:session} = useSession();

    const [posts, setPosts] = useState<Post[]>([]);


    const router = useRouter();

    useEffect(() => {
        const fetchPosts = async ()=>{
            const res = await fetch(`/api/users/${session?.user?.id}/posts`);
            const data = await res.json();

            setPosts(data);
        }

           fetchPosts();

    }, []);
    const handleEdit = (_id:string)=>{
            router.push(`/update-prompt?id=${_id}`)
    }

    const handleDelete = async (_id:string)=>{

        try {
         await fetch(`/api/prompt/${_id}`,{
            method:'DELETE'
        })
        router.push('/')
            }catch (e) {
        console.log(e)
    }

    }
    return (
      <Profile name={'My'} desc={'Welcome to your personalized profile page'} data={posts} handleEdit={handleEdit} handleDelete={handleDelete}/>
    );
};

export default MyProfile;