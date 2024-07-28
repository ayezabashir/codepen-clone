import { GithubAuthProvider, GoogleAuthProvider, signInWithRedirect } from "firebase/auth"
import { auth } from "../config/firebase.config"
const googleProvider = new GoogleAuthProvider()
const githubProvider = new GithubAuthProvider()

export const signInWithGoogle = async () => {
    await signInWithRedirect(auth, googleProvider).then(userCredentials => {
        window.location.reload()
    })
}

export const signInWithGithub = async () => {
    await signInWithRedirect(auth, githubProvider).then(userCredentials => {
        window.location.reload()
    })
}