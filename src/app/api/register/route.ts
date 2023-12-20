import {NextResponse} from "next/server";
import {connectDB} from "@/app/config/db";
import User from "@/app/models/User";



export const POST = async (req:Request) =>{
    const {username, email, password, confirmPassword} = await req.json();

    if (password !== confirmPassword){
        return  NextResponse.json('Passwords do not match',{status:400})
    }

    await connectDB();

    const existingUser = await User.find({email});

    if (existingUser){
        return NextResponse.json('User already exists',{status:400})
    }

    // const hashedPassword = await bcrypt.hash(password,10);
    const newUser = new User({username, email, password});

    try {
            await newUser.save();
            return NextResponse.json('User registered', {status:200})
    }catch (e){
        return NextResponse.json(e,{status:500})
    }
}