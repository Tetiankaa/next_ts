'use client'



import {useEffect, useState} from "react";
import {IUser} from "@/app/interfaces/userInterface";
import {Card, List, ListItem} from "@material-tailwind/react";

const AllUsers = () => {
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        const fetchAllUsers = async ()=>{
            const response = await fetch('/api/users');
            const data = await response.json();
            setUsers(data)
        }

        fetchAllUsers().then();
    }, []);
    return (
        <div>
            {
                users && users.map((user)=>(
                    <Card key={user.id} className={'mb-4'}>
                        <List>
                            <ListItem>{user.name}</ListItem>
                        </List>
                    </Card>
                ))
            }
        </div>
    );
};

export default AllUsers;