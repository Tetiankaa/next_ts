'use client'

import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";
import {useEffect} from "react";

const Register = () => {
        const router = useRouter();
        const {data:session, status:sessionStatus} = useSession();

    useEffect(() => {
        if (sessionStatus === 'authenticated'){
            router.push('/dashboard')
        }
    }, [sessionStatus]);

    return sessionStatus !== 'authenticated' && (
        <div className={'min-h-screen bg-gray-800 flex items-center justify-center'}>
            <div className={'bg-white p-8 rounded shadow-md w400'}>
                <h2 className={'text-2xl font-semibold mb-4'}>Register</h2>

                <form>
                    <div className={'mb-4'}>

                        <div className={'mb-4'}>
                            <label htmlFor="username" className={'block text-gray-700 text-sm font-bold mb-2'}>Username</label>
                            <input type="text" id={'username'} name={'username'} className={'w-full p-2 border border-gray-300 rounded'}/>
                        </div>

                        <div className={'mb-4'}>
                            <label htmlFor="email" className={'block text-gray-700 text-sm font-bold mb-2'}>Email</label>
                            <input type="text" id={'email'} name={'email'} className={'w-full p-2 border border-gray-300 rounded'}/>
                        </div>

                        <div className={'mb-40'}>
                            <label htmlFor="password" className={'block text-gray-700 text-sm font-bold mb-2'}>Password</label>
                            <input type="text" id={'password'} name={'password'} className={'w-full p-2 border border-gray-300 rounded'}/>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
};

export default Register;