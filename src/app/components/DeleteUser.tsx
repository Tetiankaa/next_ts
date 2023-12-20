'use client'

import React, {FormEvent, useState} from "react";
import {Alert, Button, Input} from "@material-tailwind/react";

const DeleteUser = () => {
    const [userId, setUserId] = useState<string>('')
    const [responseOk, setResponseOk] = useState<boolean>(false);

    const handleDelete = async (e:FormEvent) =>{
            e.preventDefault()
        try {
        const res =  await fetch(`/api/users/${userId}`,{
            method:'DELETE'
        })

            if (res.status === 200){
                setResponseOk(true);
                setUserId('');
            }else {
                setResponseOk(false)
            }
        }catch (e) {
            console.error('Failed to delete user')
        }
    }
    return (
        <div>
            <form onSubmit={handleDelete}>
                <Input crossOrigin={undefined} label={'ID'} type={"text"} value={userId} placeholder={'ID'} onChange={e=>setUserId(e.target.value)} required/>
                <Button type={"submit"} className={'mt-2'}>Delete</Button>
                {responseOk && <Alert>{`User # ${+userId+1} successfully deleted` }</Alert>}
            </form>
        </div>
    );
};

export default DeleteUser;