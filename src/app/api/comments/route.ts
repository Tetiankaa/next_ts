import {comments} from "@/data/comments";

export const GET = async (req:Request, res:Response)=>{

    try {
        return new Response(JSON.stringify(comments),{status:200})
    }catch (e) {
        return new Response('Failed to fetch all comments',{status:500})
    }
}

export const POST = async (req:Request, res:Response)=>{
    const {text} = await req.json();
    try {
        const newComment = {
            id:Date.now(),
            text
        }

        comments.push(newComment);
        return new Response(JSON.stringify(newComment),{status:200})
    }catch (e){
        return new Response('Failed to create a new comment',{status:500})
    }
}