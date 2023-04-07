import Head from 'next/head'
import Header from "@/components/Header";
import React from "react";
import {Fragment, useState} from "react";
import {collection} from "firebase/firestore";
import {doc, addDoc,getDoc,orderBy, query} from "firebase/firestore";
import {serverTimestamp} from "firebase/firestore";
import {useCollection} from "react-firebase-hooks/firestore";
import DocumentRow from "@/pages/DocumentRow";
import {
    Button,
    Dialog,
   DialogFooter, DialogBody,
} from "@material-tailwind/react";

import {IconButton} from "@material-tailwind/react";
import {DialogActions, DialogContent, DialogTitle, Icon} from "@mui/material";
import Image from "next/image";
import {auth, db} from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect } from 'react';

export default function Home() {
    const [user, loading, error] = useAuthState(auth);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    const[input,setInput] = useState("");


    const [snapshot] = useCollection(
        user &&
        query(
            collection(db, "Userdocs", user.email, "docs"),
            orderBy("timeStamp", "desc")
        )
    );



    const createDocument= async () => {
        if (!input) return;
        const docRef = await addDoc(collection(db, "Userdocs",user.email,"docs"), {
            filename: input,
            timeStamp: serverTimestamp(),
        });


        setInput("");
        setOpen(false);
    };



    const dialog = (
        <Dialog
            open={open}
            handler={handleOpen}
            className="fixed inset-0 flex items-center justify-center z-50 h-full"
        >
            <div className="w-3/4 md:w-1/4 h-2/6 justify-center bg-white pt-6 rounded-md shadow-lg">

                <DialogBody>
                    <div className="mb-4 py-2 flex justify-center">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            type={"text"}
                            placeholder={"Enter name of document..."}
                            onKeyDown={(e) => e.key === "Enter" && createDocument()}
                            className={"outline-none w-full py-2 px-2"}
                        />
                    </div>
                </DialogBody>
                <DialogFooter className={"flex justify-evenly"}>
                    <Button
                        color={"blue"}
                        onClick={(e) => setOpen(false)}
                        ripple="dark"
                        className={"flex text-black px-6 py-2 text-lg bg-blue-400"}
                    >
                        Cancel
                    </Button>

                    <Button
                        color={"blue"}
                        onClick={createDocument}
                        ripple="dark"
                        className={"flex text-black px-6 py-2 text-lg bg-blue-400"}
                    >
                        Create
                    </Button>
                </DialogFooter>
            </div>
        </Dialog>



);



    const router=useRouter();
    useEffect(() => {
        if (!loading && !user) {
            router.push('/Login');
        }
    }, [user, loading, router]);
    return (

        <div>
            {dialog}
            <Head>
                <title>Home Page</title>
            </Head>
            <div>

            <Header user={user}/>




                <section className='  justify-between pb-10 px-10'>
                    <div className='mx-auto max-w-3xl'>
                        <div className=' flex items-center justify-between py-6'>
                            <h2 className='text-gray-700 text-lg'>Start a new document</h2>
                            <IconButton
                                variant="text"
                                color="gray"
                                buttonType="outline"
                                iconOnly={true}
                                ripple="dark"
                                className='border-0'
                            >
                                <Icon className="material-icons  text-3xl">more_vert</Icon>

                            </IconButton>
                        </div>
                       <div className='relative h-52 w-40 border-2 cursor-pointer hover:border-blue-700'>

                               <Image
                                   src="/assets/addimage.png"
                                   alt="Add Document"
                                   width={200}
                                   height={200}
                                   onClick={handleOpen}
                               />



                        </div>

                        <p className='ml-2 mt-2 font-semibold text-sm text-gray-700'>Blank</p>
                    </div>
                </section>
                <section className=' px-10 md:px-0'>
                    <div className='max-w-3xl mx-auto py-8 text-sm text-gray-700'>
                        <div className='flex items-center justify-between pb-5'>
                            <h2 className='font-medium flex-grow'>My Documents</h2>
                            <p className='mr-12'>Date Created</p>
                            <Icon className='material-icons text-gray-500 text-3xl'>folder</Icon>
                        </div>

                    {snapshot?.docs.map(doc =>(
                        <DocumentRow
                        key={doc.id}
                        id={doc.id}
                        fileName={doc.data().filename}
                        date={doc.data().timeStamp}
                        />
                    ))}
                    </div>
                </section>
            </div>

        </div>

    )
}













