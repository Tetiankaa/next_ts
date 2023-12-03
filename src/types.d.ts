export type Result = {
    pageid:string,
    title:string,
    extract:string,
    thumbnail?:{
        source:string,
        width:number,
        height:number
    }
}

// export type SearchResult = {
//     query?:{
//         pages?:Result[]
//     }
// }
export type SearchResult = {
    query?: {
        pages?: {
            [pageId: string]: Result;
        };
    };
};
