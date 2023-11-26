import {userService} from "@/services/userService";
import Users from "@/app/(main-layout)/users/components/Users";

const Page = async () => {

    const {data} = await userService.getAll();
    return (
        <div>
            <Users users={data}/>
        </div>
    );
};

export default Page;