import {NextResponse} from "next/server";
import {connectDB} from "@/app/config/db";
import User from "@/app/models/User";
import bcrypt from "bcryptjs"


export const POST = async (req:Request) =>{
    const {username, email, password} = await req.json();


    await connectDB();

    // @ts-ignore
    const existingUser = await User.find({email});

    if (existingUser[0]){
        return NextResponse.json('User already exists',{status:400})
    }

    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = new User({username, email,password: hashedPassword });

    try {
            await newUser.save();
            return NextResponse.json('User registered', {status:201})
    }catch (e){
            return NextResponse.json(e,{status:500})
    }
}