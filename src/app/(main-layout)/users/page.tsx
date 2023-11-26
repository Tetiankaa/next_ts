import {userService} from "@/services/userService";
import Users from "@/app/(main-layout)/users/components/Users";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Users',
}

const Page = async () => {

    const {data} = await userService.getAll();
    return (
        <div>
            <Users users={data}/>
        </div>
    );
};

export default Page;