import {IPost} from "@/interface/postInterface";
import {FC} from "react";
import {Post} from "@/app/(main-layout)/users/[id]/posts/components/Post";

interface IProps {
    posts:IPost[]
}
const Posts:FC<IProps> = ({posts}) => {

    return (
        <div>
            {posts.map(post=><Post post={post} key={post.id}/>)}
        </div>
    );
};

export {Posts};