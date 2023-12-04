'use client'
import React, {ChangeEvent, FormEvent, useState} from "react";
import {useRouter} from "next/navigation";

const initState = {
    name:'',
    email:'',
    message:''
}
const Feedback = () => {
    const [data, setData] = useState(initState);
    const router = useRouter();

    const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const name = e.target.name;

        setData(prevState => ({
            ...prevState,
            [name]:e.target.value
        }))
    }
    const handleSubmit = async (e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const {name,message,email} = data;

        const res = await fetch('http://localhost:3000/api/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name, email, message
            })
        })

        const result = await res.json();
        console.log(result);

        router.push(`/thank-you/`)
    }

    const canSave = Object.values(data).every(Boolean);


    return (
        <form className={'flex flex-col mx-auto max-w-3xl p-6'} onSubmit={handleSubmit}>

            <h1 className={'text-4xl mb-4'}>Contact us</h1>
            <label htmlFor="name" className={'text-2xl mb-1'}>Name:</label>
            <input
                type="text"
                id={'name'}
                name="name"
                placeholder={'Jane'}
                pattern={'([A-Z])[\\w+.]{1,}'}
                value={data.name}
                autoFocus
                className={'p-3 mb-6 text-2xl text-black'}
                onChange={handleChange}
            />

            <label className="text-2xl mb-1" htmlFor="email">Email:</label>
            <input type="text"
                    id={'email'}
                   name={'email'}
                   placeholder={'Jane@yoursite.com'}
                   pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                   value={data.email}
                   className="p-3 mb-6 text-2xl rounded-2xl text-black"
                   onChange={handleChange}
            />

            <label className="text-2xl mb-1" htmlFor="message">Message:</label>
            <textarea
                id="message"
                name="message"
                placeholder="Your message here..."
                cols={33}
                rows={5}
                value={data.message}
                className={'p-3 mb-6 text-2xl rounded-2xl text-black'}
                onChange={handleChange}
            />

            <button
                className={'p-3 mb-6 text-2xl rounded-2xl text-black border-solid border-white border-2 max-w-xs bg-slate-400 hover:cursor-pointer hover:bg-slate-300 disabled:hidden'}
                disabled={!canSave}
            >Submit</button>
        </form>
    );
};

export default Feedback;
