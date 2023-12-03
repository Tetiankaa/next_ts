import React from "react";
import {Metadata} from "next";
import getAllUsers from "@/lib/getAllUsers";
import Link from "next/link";

export interface IUser{
    id:number,
    name:string
}
export const metadata: Metadata = {
    title: 'Users'
}

const UsersPage = async () => {

    // const users:IUser[] = await fetch('https://jsonplaceholder.typicode.com/users',{cache:'no-store'}).then(res=>res.json());
   const usersData:Promise<IUser[]> = getAllUsers();
   const users = await usersData;

    return (
        <div>
                {users.map(user=> <p key={user.id}><Link href={`/users/${user.id}`}>{user.name} {user.id}</Link></p>)}
        </div>
    );
};

export default UsersPage;
