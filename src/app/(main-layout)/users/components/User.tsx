import {IUser} from "@/interface/userInterface";
import {FC} from "react";
import Link from "next/link";

interface IProps {
    user:IUser
}
const User:FC<IProps> = ({user}) => {
    const {id,name,email,username} = user;
    return (
        <div>
            <div>id: {id}</div>
            <div>name: {name}</div>
            <div>email: {email}</div>
            <div>username: {username}</div>
            <Link href={`/users/${id}/posts`}>see posts</Link>
        </div>
    );
};

export default User;