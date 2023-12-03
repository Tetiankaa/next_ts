import React, {FC} from "react";
import {IPost} from "@/app/users/[userId]/page";

interface IProps {
   promise:Promise<IPost[]>
}
const Posts:FC<IProps> = async ({promise}) => {
        const posts = await promise;
    return (
        <div>
            {posts.map(post=><div key={post.id} style={{padding:20}}>
                <h4>{post.title}</h4>
                <p>{post.body}</p>
            </div>)}
        </div>
    );
};

export default Posts;