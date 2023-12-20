'use client'

import React, {useState} from "react";
import {Accordion, AccordionBody, AccordionHeader} from "@material-tailwind/react";
import AllUsers from "@/app/components/AllUsers";
import SpecificUser from "@/app/components/SpecificUser";
import CreateUser from "@/app/components/CreateUser";
import UpdateUser from "@/app/components/UpdateUser";
import DeleteUser from "@/app/components/DeleteUser";

const AccordionUI = () => {
    const [open, setOpen] = useState<number>(1);

    const handleOpen = (value:number)=> setOpen(open === value ? 0 : value);


    return (
        <section className={'w-[40rem]'}>
            <Accordion open={open === 1}>
                <AccordionHeader onClick={()=>handleOpen(1)}>All Users</AccordionHeader>
                <AccordionBody>
                    <AllUsers/>
                </AccordionBody>
            </Accordion>

            <Accordion open={open === 2}>
                <AccordionHeader onClick={()=>handleOpen(2)}>Search for specific User</AccordionHeader>
                <AccordionBody>
                    <SpecificUser/>
                </AccordionBody>
            </Accordion>

            <Accordion open={open === 3}>
                <AccordionHeader onClick={()=>handleOpen(3)}>Create New User</AccordionHeader>
                <AccordionBody>
                   <CreateUser/>
                </AccordionBody>
            </Accordion>

            <Accordion open={open === 4}>
                <AccordionHeader onClick={()=>handleOpen(4)}>Update User</AccordionHeader>
                <AccordionBody>
                    <UpdateUser/>
                </AccordionBody>
            </Accordion>

            <Accordion open={open === 5}>
                <AccordionHeader onClick={()=>handleOpen(5)}>Delete User</AccordionHeader>
                <AccordionBody>
                 <DeleteUser/>
                </AccordionBody>
            </Accordion>
        </section>
    );
};

export default AccordionUI;