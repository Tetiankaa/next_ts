import React, {FC, Suspense} from "react";
import {IUser} from "@/app/users/page";
import getUser from "@/lib/getUser";
import getUserPosts from "@/lib/getUserPosts";
import Posts from "@/app/users/[userId]/components/Posts";
import {Metadata} from "next";
import getAllUsers from "@/lib/getAllUsers";
import notFound from "@/app/users/[userId]/not-found";


interface IProps {
    params:{
        userId:string
    }
}
export interface IPost {
    id:number,
    title:string,
    body:string
}

export async function generateMetadata({params:{userId}}:IProps):Promise<Metadata>{
    const userData:Promise<IUser> = await getUser(userId);
    const user:IUser = await userData;

    if (!user?.name){
        return {
            title:'User not found'
        }
    }

    return {
        title: user.name,
        description:`this is the page of ${user.name}`
    }
}

const UserPage:FC<IProps> = async ({params:{userId}}) => {
        const userPostsData:Promise<IPost[]> = await getUserPosts(userId);
        const userData:Promise<IUser> = await getUser(userId);

        // const [posts, user] = await Promise.all([userPostsData, userData]);
        const user = await userData;

        if (!user?.name) return notFound() ;
    return (
        <div>
            <h1>{user.name}</h1>
            <Suspense fallback={<h2>loading...</h2>}>
                <Posts promise={userPostsData}/>
            </Suspense>
        </div>
    );
};
export async function generateStaticParams(){
    const usersData:Promise<IUser[]> = getAllUsers();
    const users = await usersData;

    return users.map(user=>(
        {userId:user.id.toString()}
    ))
}

export default UserPage;