export default async function getUserPosts(userId:string) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`,{});

    if (!res.ok) return undefined;

    return res.json();
}