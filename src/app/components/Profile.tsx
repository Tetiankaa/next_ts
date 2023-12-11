import React from "react";
import {Post} from "@/app/create-prompt/page";
import PromptCard from "@/app/components/PromptCard";
import {ObjectId} from "mongoose";

type Props = {
    name:string,
    desc:string,
    data:Post[],
    handleEdit?:(_id:string)=>void,
    handleDelete?:(_id:string)=>void
}
const Profile = ({desc,handleDelete,handleEdit, data, name}:Props) => {
    return (
        <section className={'w-full'}>
            <h1 className={'head_text text-left'}>{name} Profile</h1>
            <p className={'desc text-left'}>{desc}</p>

            <div className={'mt-10 prompt_layout'}>
                {data.map(post=>(
                    <PromptCard key={post.prompt}
                                post={post}
                                handleEdit={()=>handleEdit && handleEdit(post._id)}
                                handleDelete={()=>handleDelete && handleDelete(post._id)}
                    />
                ))}
            </div>
        </section>
    );
};

export default Profile;