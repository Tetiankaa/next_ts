import {NextResponse} from "next/server";

const DATA_SOURCE_URL = 'https://jsonplaceholder.typicode.com/todos';
const API_KEY:string = process.env["DATA_API_KEY "] as string;
export async function GET(request:Request){
    const origin = request.headers.get('origin');

    const res = await fetch(DATA_SOURCE_URL);
    const todos:Todo[] = await res.json();

    return new NextResponse(JSON.stringify(todos),{
        headers:{
            'Access-Control-Allow-Origin':origin || '*',
            'Content-Type':'application/json'
        }
    })
}

export async function DELETE(request:Request){
    const {id}:Partial<Todo> = await request.json();

    if (!id) return NextResponse.json({'message': "Todo id required"});

    await fetch(`${DATA_SOURCE_URL}/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'API-Key':API_KEY
        }
    })

    return NextResponse.json({'message':`Todo ${id} deleted.`})
}

export async function POST(request:Request){
    const data:Todo = await request.json();
    const {title,userId} = data;

    if (!userId || !title) return NextResponse.json({'message':'Missing required data'})

    const newTodo:Todo =  await fetch(DATA_SOURCE_URL,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
            'API-Key':API_KEY
        },
        body:JSON.stringify({title, userId, completed:false})
    }).then(res=>res.json())

    return NextResponse.json(newTodo)
}

export async function PUT(request:Request){
    const data:Todo = await request.json();
    const {title,userId,completed,id} = data;

    if (!title || !userId || !id || typeof(completed) !== 'boolean') return NextResponse.json({'message':'Missing required data'});

    const updatedTodo = await fetch(`${DATA_SOURCE_URL}/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'API_KEY':API_KEY
        },
        body:JSON.stringify(data)
    }).then(res=>res.json())

    return NextResponse.json(updatedTodo);
}