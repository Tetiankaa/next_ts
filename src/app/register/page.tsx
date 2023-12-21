'use client'

import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";
import {FormEvent, useEffect, useState} from "react";
import Link from "next/link";
import {toast} from "react-toastify";

export type formData = {
    username?:string,
    email:string,
    password:string,
    confirmPassword?:string
}
const Register = () => {
        const router = useRouter();
        const {data:session, status:sessionStatus} = useSession();
        const [formData, setFormData] = useState<formData>(null);

    useEffect(() => {
        if (sessionStatus === 'authenticated'){
            router.push('/dashboard')
        }
    }, [sessionStatus]);

    const handleSubmit = async (e:FormEvent)=>{
        e.preventDefault();

        if (formData.password !== formData.confirmPassword){
            toast.error('Passwords do not match');
            return;
        }

        try {
            const res = await fetch('/api/register',{
                method:'POST',
                body:JSON.stringify(formData)
            })

            if (res.status === 400){
                toast.error('This email is already registered.');
                return;
            }else if (res.status === 201){
                router.push('/login')
            }
        }catch (e) {
            toast.error('The unknown error is occurred. Try later.');
        }

    }
    

    return (
        sessionStatus !== "authenticated" && (
            <div className={'min-h-screen flex justify-center items-center bg-gray-100'}>
                <div className="bg-white p-8 rounded shadow-md w-96">
                    <h2 className="text-2xl font-semibold mb-4">Register</h2>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                            <input type="text" id="username" name="username" className="w-full p-2 border border-gray-300 rounded" onChange={e=>setFormData({...formData,username:e.target.value})} required/>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                            <input type="email" id="email" name="email" className="w-full p-2 border border-gray-300 rounded" onChange={e=>setFormData({...formData,email:e.target.value})} required/>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                            <input type="password" id="password" name="password" className="w-full p-2 border border-gray-300 rounded" onChange={e=>setFormData({...formData,password:e.target.value})} required/>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="password-confirm" className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
                            <input type="password" id="password-confirm" name="password-confirm" className="w-full p-2 border border-gray-300 rounded" onChange={e=>setFormData({...formData,confirmPassword:e.target.value})} required/>
                        </div>

                        <div>
                            <button type="submit" className="mb-5 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Register</button>
                        </div>

                        <span>{" "}
                            Already have an account?{" "}
                            <Link className="text-center text-blue-500 hover:underline mt-2" href="/login">Login</Link>
                        </span>

                    </form>
                </div>
            </div>
        )
    );
};

export default Register;