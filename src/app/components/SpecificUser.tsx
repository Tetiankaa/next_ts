'use client'



import {useEffect, useState} from "react";
import {IUser} from "@/app/interfaces/userInterface";
import {Button, Card, Input, List, ListItem} from "@material-tailwind/react";

const SpecificUser = () => {

    const [userId, setUserId] = useState<string | number>('');
    const [userData, setUserData] = useState<IUser>(null);
            const fetchUserData = async ()=>{
                const res = await fetch(`/api/users/${userId}`);

                if (res.status === 200){
                    const data = await res.json();
                    setUserData(data);
                }else {
                    console.error("Failed to fetch user details");
                    setUserData(null);
                }
            }


    return (
        <>
        <div className={'flex'}>
            <div className={'w-72'}>
                <Input crossOrigin={undefined} label={'Enter user ID'} type={'text'} value={userId} onChange={e=>setUserId(e.target.value)}/>
            </div>
            <Button onClick={fetchUserData} className={'ml-4'}>Search</Button>
        </div>

            {userData ?
                <>
                    <Card className={'w-96 mt-5'} key={userData.id}>
                        <List>
                            <ListItem>ID: {userData.id}</ListItem>
                            <ListItem>name: {userData.name}</ListItem>
                            <ListItem>email: {userData.email}</ListItem>
                        </List>
                    </Card>
                </>

                : (
                    <p className={'mt-2'}>No user found.</p>
                )
            }
        </>
    );
};

export default SpecificUser;