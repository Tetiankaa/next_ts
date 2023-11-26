import {IPost} from "@/interface/postInterface";
import {FC} from "react";

interface IProps{
    post:IPost
}
const Post:FC<IProps> = ({post}) => {

    const {id,userId,body,title} = post;
    return (
        <div>
            <div>id: {id}</div>
            <div>userId: {userId}</div>
            <div>body: {body}</div>
            <div>title: {title}</div>
        </div>
    );
};

export {Post};