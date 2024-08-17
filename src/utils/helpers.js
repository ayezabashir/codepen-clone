import { auth } from "../config/firebase.config"
import { v4 as uuidv4 } from 'uuid';

export const Menus = [
    { id: uuidv4(), name: "Projects", uri: "/home/projects" },
    { id: uuidv4(), name: "Profile", uri: "/home/profile" },
]

export const signOutAction = async () => {
    await auth.signOut().then(() => {
        window.location.reload();
    })
}