import Login from "@/pages/Login";
import { useRouter } from 'next/router';
import { auth, db } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Icon } from "@mui/material";
import React, { useEffect, useState } from "react";
import DescriptionIcon from '@mui/icons-material/Description';
import {Button, IconButton} from "@material-tailwind/react";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { doc, getDoc } from "firebase/firestore";
import TextEditor from "@/components/TextEditor";

function Doc() {
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();
    const { id } = router.query;
    const [snapshot, setSnapshot] = useState(null);
    const [loadingSnapshot, setLoadingSnapshot] = useState(true);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/Login');
        }
    }, [user, loading, router]);

    useEffect(() => {
        if (id && user) {
            setLoadingSnapshot(true);
            const getDocFromFirestore = async () => {
                const docRef = doc(db, "Userdocs", user.email, "docs", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setSnapshot(docSnap);
                } else {
                    console.log("No such document!");
                }
                setLoadingSnapshot(false);
            };
            getDocFromFirestore();
        }
    }, [id, user]);

    if (loading || loadingSnapshot) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return null;
    }

    if(!loadingSnapshot&& !snapshot?.data() ?.filename){
        router.replace("/");
    }


    return (
        <div>
            <header className={"flex justify-between items-center p-3 pb-1"}>
                <DescriptionIcon className="hidden md:inline material-icons text-blue-500 text-5xl cursor-pointer" />
                <div className={"flex-grow px-2"}>
                    <h2>{snapshot?.data()?.filename}</h2>
                    <div className={" flex items-center text-sm space-x-1 -ml-1 h-8 text-gray-600"}>
                        <p
className="option"
                        >File</p>
                        <p className="option">Edit</p>
                        <p className="option">View</p>
                        <p className="option">Insert</p>
                        <p className="option">Format</p>
                        <p className="option">Tools</p>
                    </div>
                </div>
                <Button
                    size="regular"
                    className={"hidden md: inline-flex  py-2 bg-blue-400 justify-center"}
                    ripple={"light"}
                >SHARE
                </Button>
                <img className={"rounded-full cursor-pointer h-10 w-10 ml-2"} src={user?.photoURL} alt={""}/>
            </header>

            <TextEditor/>
        </div>
    );
}

export default Doc;
