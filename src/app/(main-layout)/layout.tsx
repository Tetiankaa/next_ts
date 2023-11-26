import {FC, PropsWithChildren} from "react";
import Header from "@/app/(main-layout)/components/Header";

const Layout:FC<PropsWithChildren> = ({children}) => {
    return (
        <div>
            <Header/>
            {children}
        </div>
    );
};

export default Layout;