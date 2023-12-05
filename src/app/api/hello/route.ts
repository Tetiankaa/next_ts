import {limiter} from "@/app/api/config/limiter";
import {NextResponse} from "next/server";

export async function GET(request:Request){
    const remaining = await limiter.removeTokens(1);

    const origin = request.headers.get('origin');
    console.log(remaining)

   if (remaining<0){
       return new NextResponse(null,{
           status:429,
           statusText:'Too many requests',
           headers:{
               'Access-Control-Allow-Origin':'*' || origin,
               'Content-Type':'text/plain'
           }
       })
   }
    return new Response('Hello Route!');
}