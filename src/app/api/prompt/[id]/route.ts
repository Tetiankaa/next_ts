import {connectToDB} from "@/app/utils/database";
import Prompt from "@/app/models/prompt";
import {validateTags} from "next/dist/server/lib/patch-fetch";

export const GET = async (req:Request,{params}:{params:{id:string}})=>{
    try {
        await connectToDB();

        // @ts-ignore
        const prompt = await Prompt.findById(params.id).populate('creator');

        if (!prompt) return new Response('Prompt not found',{status:404})

        return new Response(JSON.stringify(prompt),{status:200})
    }catch (e) {
        return new Response('Failed to fetch all prompts',{status:200})
    }
}

export const PATCH = async (req:Request,{params}:{params:{id:string}})=>{
        const {prompt, tag} = await req.json();

    try {
        await connectToDB();
        // @ts-ignore
        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt){
            return new Response('Prompt not found',{status:404})
        }

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt),{status:200})
    }catch (e) {
        return new Response('Failed to update prompt',{status:500})
    }
}

export const DELETE = async (reg:Request,{params}:{params:{id:string}})=>{
        try {
            await connectToDB();
            // @ts-ignore
            await Prompt.findByIdAndDelete(params.id);

            return new Response('Prompt deleted successfully', {status:200})
        }catch (e) {
            return new Response('Failed to delete prompt', {status:500})
        }
}