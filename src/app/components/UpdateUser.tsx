'use client'


import {useState} from "react";
import {Button, Input} from "@material-tailwind/react";

const UpdateUser = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [userId, setUserId] = useState<string>('')

    const handleSubmit = async ()=>{
        try {
            const response = await fetch(`/api/users/${userId}`,{
                method:'PATCH',
                body:JSON.stringify({name, email, password})
            });
            await response.json();
        }catch (e) {
            console.error('Failed to update a user')
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Input crossOrigin={undefined} label={'ID'} type={"text"} value={userId} placeholder={'ID'} onChange={e=>setUserId(e.target.value)} required/>
                <Input crossOrigin={undefined} label={'Name'} type={"text"} value={name} placeholder={'Name'} onChange={e=>setName(e.target.value)} />
                <Input crossOrigin={undefined} label={'Email'} type={"text"} value={email} placeholder={'Email'} onChange={e=>setEmail(e.target.value)} />
                <Input crossOrigin={undefined} label={'Password'} type={"text"} value={password} placeholder={'Password'} onChange={e=>setPassword(e.target.value)} />
                <Button className={'mt-2'} type={"submit"}>Update</Button>
            </form>
        </div>
    );
};

export default UpdateUser;