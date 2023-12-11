import {connectToDB} from "@/app/utils/database";
import Prompt from "@/app/models/prompt";

export const GET = async (req:Request,{params}:{params:{id:string}})=>{
    try {
        await connectToDB();

        // @ts-ignore
        const prompts = await Prompt.find({creator:params.id}).populate('creator');

        return new Response(JSON.stringify(prompts),{status:200})
    }catch (e) {
        return new Response('Failed to fetch all prompts',{status:500})
    }
}