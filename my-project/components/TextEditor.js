import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { auth, db } from "@/firebase";
import { useRouter } from "next/dist/client/router";
import { convertFromRaw, convertToRaw } from "draft-js";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
const Editor = dynamic(
    () => import("react-draft-wysiwyg").then((module) => module.Editor),
    {
        ssr: false,
    }
);

function TextEditor() {
    const [user, loading, error] = useAuthState(auth);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const router = useRouter();
    const { id } = router.query;

    const userEmail = user?.email || '';
    const [snapshot] = useDocumentOnce(
        doc(db, "Userdocs", user?.email, "docs", id),
    );

    useEffect(() => {
        if (snapshot?.data()?.editorState) {
            setEditorState(
                EditorState.createWithContent(
                    convertFromRaw(snapshot?.data()?.editorState)
                )
            );
        }
    }, [snapshot]);

    const onEditorStateChange = async (editorState) => {
        setEditorState(editorState);

        const documentRef = doc(db, "Userdocs", user.email, "docs", id);

        await setDoc(
            documentRef,
            {
                editorState: convertToRaw(editorState.getCurrentContent()),
            },
            {
                merge: true,
            }
        );
    };

    return (
        <div className="bg-[#F8F9FA] min-h-screen pb-16">
            <Editor
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                toolbarClassName="flex sticky top-0 z-50 !justify-center mx-auto"
                editorClassName="mt-6 p-10 bg-white shadow-lg max-w-5xl mx-auto mb-12 border"
            />
        </div>
    );
}

export default TextEditor;
