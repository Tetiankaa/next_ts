import {comments} from "@/data/comments";

export const DELETE = async (req:Request,{params}:{params:{commentId:string}})=>{

        try {
          const commentToDelete = comments.find(comment=>comment.id === +params.commentId);
            console.log(commentToDelete)
            if (!commentToDelete) {
                return new Response('Comment not found', { status: 404 });
            }

         const index = comments.findIndex(comment=>comment.id === commentToDelete.id);
         comments.splice(index,1);

         return  new Response('Comment deleted', {status:200})
        }catch (e) {
            console.error(e);
            return new Response('Failed to delete comment', {status:500})
        }
}