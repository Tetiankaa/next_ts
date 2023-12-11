import NextAuth, {Account, DefaultSession, Profile} from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import {connectToDB} from "@/app/utils/database";
import User from "@/app/models/user";
import {ObjectId} from "mongoose";
import {AdapterUser} from "next-auth/adapters";

export interface CustomSession extends DefaultSession {
    user?: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
        id?: ObjectId | string | null | undefined
    };
}

declare module "next-auth" {
    interface Session {
        user?: {
            id: string;
        } & DefaultSession["user"];
    }
}

const handler = NextAuth({
        providers:[
            GoogleProvider({
                clientId:process.env["GOOGLE_ID"] || '',
                clientSecret:process.env.GOOGLE_CLIENT_SECRET || ''
        })
        ],
        callbacks:{
            async session({session}:{session:CustomSession}):Promise<CustomSession>{
                // @ts-ignore
                const sessionUser = await User.findOne({ email: session?.user?.email });

                session.user = {
                    ...session.user,
                    id:sessionUser?._id?.toString()
                }

                return session;
            },
            async signIn(params: {
                // @ts-ignore
                user:User | AdapterUser;
                account: Account | null;
                profile?: Profile | undefined;
                email?: { verificationRequest?: boolean | undefined } | undefined;
                credentials?: Record<string, any> | undefined;
            }): Promise<boolean> {
                try {
                    await connectToDB();

                    // @ts-ignore
                    const userExists = await User.findOne({
                        email: params.profile?.email,
                    });

                    if (!userExists) {
                        // @ts-ignore
                        await User.create({
                            email: params.profile?.email,
                            username: params.profile?.name?.replace(" ", "").toLowerCase(),
                            image: params.profile?.image,
                        });
                    }

                    return true;
                } catch (e) {
                    console.log(e);
                    return false;
                }
            }

        }
    }
)

export {handler as GET, handler as POST};

