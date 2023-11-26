import {IUser} from "@/interface/userInterface";
import {FC} from "react";
import User from "@/app/(main-layout)/users/components/User";

interface IProps {
    users:IUser[]
}
const Users:FC<IProps> = ({users}) => {
    return (
        <div>
            {users.map(user=><User key={user.id} user={user}/>)}
        </div>
    );
};

export default Users;