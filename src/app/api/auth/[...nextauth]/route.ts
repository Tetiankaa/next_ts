import CredentialsProvider from "next-auth/providers/credentials"
import {connectDB} from "@/app/config/db";
import User, {IUser} from "@/app/models/User";
import bcrypt from "bcryptjs";

import NextAuth, {Account} from "next-auth";
import {AdapterUser} from "next-auth/adapters";


// @ts-ignore
const handler = NextAuth({
    providers:[
        CredentialsProvider({
            type: "credentials",
            id:'credentials',
            name:'credentials',
            credentials:{
                email:{
                    label:'Email',
                    type:'text'
                },
                password:{
                    label:"Password",
                    type:'text'
                },
            },
            async authorize(credentials: Record<"email" | "password", string>):Promise<IUser>{
                console.log('authorize started')

                await connectDB();

                try {
                    const user = await User.findOne({email:credentials.email})
                    console.log(user)

                    if (user){
                        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

                        if (isPasswordCorrect){
                            return user;
                        }
                    }
                }catch (e) {
                    throw new Error('error occurred')
                }

            }
        })
    ],
    callbacks:{
        // @ts-ignore
        async signIn(params: {
            user:typeof User | AdapterUser; account: Account | null;}) {
            console.log('sign in started')
            if (params.account?.provider === 'credentials'){
                return true;
            }
        }
    }
})

export {handler as GET, handler as POST}

