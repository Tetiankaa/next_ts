'use client'
import {FormEvent, useState} from "react";
import {Button, Input} from "@material-tailwind/react";

const CreateUser = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (e:FormEvent)=>{
        e.preventDefault();
       try {
           const response = await fetch('/api/users',{
               method:'POST',
               body:JSON.stringify({name,email, password})
           })
           await response.json();
       }catch (e) {
           console.error('Failed to create new user!')
       }

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Input crossOrigin={undefined} label={'Name'} type={"text"} value={name} placeholder={'Name'} onChange={e=>setName(e.target.value)} required/>
                <Input crossOrigin={undefined} label={'Email'} type={"text"} value={email} placeholder={'Email'} onChange={e=>setEmail(e.target.value)} required/>
                <Input crossOrigin={undefined} label={'Password'} type={"text"} value={password} placeholder={'Password'} onChange={e=>setPassword(e.target.value)} required/>
                <Button className={'mt-2'} type={"submit"}>Create</Button>
            </form>
        </div>
    );
};

export default CreateUser;