import {FC, PropsWithChildren} from "react";
import {postsService} from "@/services/postsService";
import {Posts} from "@/app/(main-layout)/users/[id]/posts/components/Posts";
import {Metadata} from "next";
export const metadata: Metadata = {
    title: 'Posts',
}

interface IProps{
    params: {id:string}
}
const Page:FC<IProps> = async  ({params:{id}}) => {

    const {data} = await postsService.getByUserId(id);

    return (
        <div>
            <Posts posts={data}/>
        </div>
    );
};

export default Page;
