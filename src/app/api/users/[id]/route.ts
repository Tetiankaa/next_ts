import {users} from "@/app/util/db";
import {NextResponse} from "next/server";
import fs from "fs";


export function GET(req:Request,{params}:{params:{id:string}}){
    const id = params.id;

        const user = users.find(u=>u.id === id);
        if (!user){
            return NextResponse.json({error:`Failed to find a user with id #${id}`},{status:500})
        }
        return NextResponse.json(user,{status:200})


 }
 export async function PATCH(req:Request, {params}:{params:{id:string}}){
     const {name, email, password} =await req.json();

try {

    // const userIndex = users.findIndex(u=>u.id === params.id);
    const user = users.find(u=>u.id === params.id);

    if (name){
        user.name = name;
    }

    if (email){
        user.email = email;
    }

      if (password){
          user.password = password;
      }

    console.log(user)
        const updatedData = JSON.stringify(users,null,2);

        fs.writeFileSync('src/app/util/db.ts',`export const users = ${updatedData};`,'utf-8')

        return NextResponse.json({user},{status:200})

}catch (e){
    return NextResponse.json({error:'Failed to update data'},{status:500})
}

 }

 export function DELETE(req:Request,{params}:{params:{id:string}}){
    try {
        const userIndex = users.findIndex(u=>u.id === params.id);
        if (userIndex === -1){
            return NextResponse.json({error:`User not found`})
        }

        users.splice(userIndex,1);

        const updatedData = JSON.stringify(users,null,2);

        fs.writeFileSync('src/app/util/db.ts',`export const users = ${updatedData};`,'utf-8')

        return NextResponse.json(`User # ${+userIndex+1} successfully deleted`, {status:200})
        
    }catch (e) {
        return NextResponse.json({error:`Failed to delete user`})
    }

 }

 //login
 export async function POST(req:Request, {params}:{params:{id:string}}){
     let {name, email, password} =await req.json();

     const user = users.find(u=>u.id === params.id)

     if (user?.name === name && user?.email === email && user?.password === password){
         return NextResponse.json({result:'Successfully logged in'})
     }else if (!name || !email || !password){
         return NextResponse.json({result:'Please fill all fields'})
     }else {
         return NextResponse.json({result:'Invalid credentials'})
     }
 }