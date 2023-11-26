import {apiService, IRes} from "@/services/apiService";
import {IPost} from "@/interface/postInterface";
import {urls} from "@/constants/urls";

const postsService = {
    getByUserId:(id:number | string):IRes<IPost[]>=>apiService.get(urls.posts.byId(id))
}

export {
    postsService
}