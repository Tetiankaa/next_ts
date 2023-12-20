import {users} from "@/app/util/db";
import {NextResponse} from "next/server";
import * as fs from "fs";

export function GET(){
    return NextResponse.json(users, {status:200})
}

//register
export async function POST(req:Request){
    const {name, email, password} =await req.json();

    if (!name || !email || !password){
        return NextResponse.json({error:'Required filed not found',ok:false},{status:400})
    }

    try {
        const newUser = {name, email, password,id:new Date().getTime().toString()};

        users.push(newUser);

        const updatedData = JSON.stringify(users,null,2);

        fs.writeFileSync('src/app/util/db.ts',`export const users = ${updatedData};`,'utf-8')

        return NextResponse.json({message:'Successfully registered a new user!'},{status:200})
    }catch (e) {
        return NextResponse.json({error:'Failed to create a new user'})
    }
}