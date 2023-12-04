import {NextResponse} from "next/server";

export async function GET(request:Request){
    const {searchParams} = new URL(request.url);

    // const name = searchParams.get('name');
    // const surname = searchParams.get('surname');
    // return NextResponse.json({name, surname})

    const obj = Object.fromEntries(searchParams.entries());

    return NextResponse.json(obj)
}