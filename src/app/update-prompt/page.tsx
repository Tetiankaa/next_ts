'use client'

import React, {FormEvent, useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {useSession} from "next-auth/react";
import {Post} from "@/app/create-prompt/page";
import Form from "@/app/components/Form";

const EditPrompt = () => {
    const router = useRouter();

    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    const [submitting, setSubmitting] = useState<boolean>(false);
    const [post, setPost] = useState<Post>({
        prompt: '',
        tag: '',
    });

    useEffect(() => {
        const getPromptDetails = async () =>{
            const response = await fetch(`/api/prompt/${promptId}`)
            const data  = await response.json();

            setPost({
                prompt:data.prompt,
                tag:data.tag
            })
        }

        if(promptId) getPromptDetails().then();
    }, [promptId]);

    const updatePrompt = async (event:FormEvent)=>{
        event.preventDefault();
        setSubmitting(true);

        if (!promptId) return alert('Prompt ID not found')
        try {
            const response = await fetch(`/api/prompt/${promptId}`,{
                method:'PATCH',
                body:JSON.stringify({
                    prompt:post.prompt,
                    tag:post.tag
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
    return (<Form type={'Edit'} post={post} setPost={setPost} submitting={submitting} handleSubmit={updatePrompt}/>
    );
};

export default EditPrompt;