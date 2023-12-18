'use client';

import React, {FormEvent, useState} from "react";

export interface IComments {
    id:number,
    text:string
}
const Comments = () => {
    const [comments, setComments] = useState<IComments[]>([]);
    const [comment, setComment] = useState<string>('')
    async function getComments() {
        const res = await fetch('/api/comments');
        const data = await res.json();
        
        setComments(data);
    }

     async function handleNewComment(){
      await fetch('/api/comments',{
          method:'POST',
          headers:{
              'Content-Type':"application/json"
          },
          body:JSON.stringify({
              text:comment
          })
      })

     }
     const deleteComment = async (id:number)=>{
         console.log(id)
        await fetch(`/api/comments/${id}`,
            {
                method:'DELETE'
            })

         getComments().then()
     }

    return (
        <>
            <button onClick={getComments}>Show comments</button>
            <div>
                {comments.map(comment=><p key={comment.id}>{comment.text} <button onClick={()=>deleteComment(comment.id)}>Delete</button></p>)}
            </div>

            <div>
                <input type="text" placeholder={'Type in a new comment'} value={comment} onChange={event => setComment(event.target.value)}/>
                <button onClick={handleNewComment}>submit</button>
            </div>
        </>
    );
};

export default Comments;