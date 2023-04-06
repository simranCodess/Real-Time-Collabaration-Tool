import Head from 'next/head'
import Layout from '../layout/layout'
    import styles from '../styles/Form.module.css';
import Image from 'next/image'
import {auth, db} from "@/firebase";
import {Button} from "@material-tailwind/react";
import {signInWithPopup,GoogleAuthProvider ,GithubAuthProvider} from "firebase/auth";
import { useRouter } from 'next/router';
import {doc, setDoc, Timestamp} from "firebase/firestore"

export default function Login() {
    const router = useRouter();
    const googleAuth=new GoogleAuthProvider();
    async function storeUserSession(user) {
        const userSessionRef = doc(db, "userSessions", user.uid);
        await setDoc(userSessionRef, {
            displayName: user.displayName,
            email: user.email,
            lastLogin: Timestamp.fromDate(new Date()),
        });
    }
    const login = async () => {
        try {
            const result = await signInWithPopup(auth, googleAuth);
            await storeUserSession(result.user);
            await router.push('/');
        } catch (error) {
            // Handle any errors here
            console.log(error.message);
        }
    };

    const githubAuth = new GithubAuthProvider();

    const loginWithGithub = async () => {
        signInWithPopup(auth, githubAuth)
            .then((result) => {
                // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                const credential = GithubAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;

                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GithubAuthProvider.credentialFromError(error);
            // ...
        });
    };


    return (
        <Layout>

            <Head>
                <title>Login</title>
            </Head>

            <section className='w-3/4 mx-auto flex flex-col
            gap-10'>
                <div className="title flex flex-col items-center">
                    <img  src={"assets/docs-icon.png"} alt={""} width={"100px"} height={"100px"}/>
                    <h1 className='text-blue-900 text-2xl font-bold py-4'>Real-Time Collaboration Tool</h1>
                    <p className={"text-gray-400 font-medium"}>Collaboration made simple, collaborate and edit documents from anywhere, anytime</p>
                </div>

                {/* form */}
                <form className='flex flex-col gap-5'>
                    <div className="input-button">
                        <Button type='button' onClick={login} className={styles.button_custom}>
                            Sign In with Google <Image src={'/assets/google.svg'} width="20" height={20}></Image>
                        </Button>
                    </div>
                    <div className="input-button">
                        <Button type='button' onClick={loginWithGithub} className={styles.button_custom}>
                            Sign In with Github <Image src={'/assets/github.svg'} width={25} height={25}></Image>
                        </Button>
                    </div>
                </form>

            </section>

        </Layout>
    )
}
