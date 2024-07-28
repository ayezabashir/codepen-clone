import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth"
import { auth } from "../config/firebase.config"
const googleProvider = new GoogleAuthProvider()


export const signInWithGoogle = async () => {
    await signInWithRedirect(auth, googleProvider).then(userCredentials => {
        window.location.reload()
    })
}
