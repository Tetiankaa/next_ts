'use client'

import React, {FormEvent, useState} from "react";
import Form from "@/app/components/Form";
import {useSession} from "next-auth/react";
import {DefaultSession} from "next-auth";
import {ObjectId, Schema} from "mongoose";
import {useRouter} from "next/navigation";


export type Post = {
    prompt:string,
    tag:string,
    userId?:Schema.Types.ObjectId,
    creator?:{
        _id:string,
        username?:string
    },
    _id?:string
}
const CreatePrompt = () => {

    const [submitting, setSubmitting] = useState<boolean>(false);
    const [post, setPost] = useState<Post>({
        prompt: '',
        tag: '',
    });


    const {data:session} = useSession();
    const router = useRouter();

    const createPrompt = async (event:FormEvent)=>{
        event.preventDefault();
        setSubmitting(true);

        try {
            const response = await fetch('/api/prompt/new',{
                method:'POST',
                body:JSON.stringify({
                    prompt:post.prompt,
                    tag:post.tag,
                    userId:session.user.id
                })
            })

            if (response.ok){
                router.push('/')
            }
        }catch (e) {
            console.log(e)
        }finally {
            setSubmitting(false)
        }
    }
    return <Form type="Create" post={post} setPost={setPost} submitting={submitting} handleSubmit={createPrompt}/>
};

export default CreatePrompt;