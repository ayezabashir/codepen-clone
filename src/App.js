import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { Home } from './container'
import { auth, db } from './config/firebase.config';
import { doc, setDoc } from 'firebase/firestore';
import spinner from "./assets/img/loading.svg"

const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((userCredentials) => {
            if (userCredentials) {
                console.log(userCredentials?.providerData[0]);
                setDoc(doc(db, "users", userCredentials?.uid), userCredentials?.providerData[0]).then(() => {
                    // dispatch
                })
            } else {
                navigate("/home/auth", { replace: true })
            }
            setInterval(() => {
                setIsLoading(false)
            }, 2000)
        })
        return () => unsubscribe();
    }, [])
    return (
        <>
            {
                isLoading ? <div
                    className='h-screen bg-white w-screen flex items-center justify-center overflow-hidden'
                >
                    <img src={spinner} alt="loading" className='w-20 h-20 bg-transparent' />

                </div> : <div className='w-screen h-screen flex justify-start items-start overflow-hidden'>
                    <Routes>
                        <Route path='/home/*' element={<Home />} />
                        {/* by default it will navigate to home page */}
                        <Route path='*' element={<Navigate to={'/home'} />} />
                    </Routes>
                </div>
            }
        </>
    )
}

export default App
