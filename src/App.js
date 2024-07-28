import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { Home } from './container'
import { auth } from './config/firebase.config';

const App = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((userCredentials) => {
            if (userCredentials) {
                console.log(userCredentials?.providerData[0]);
            } else {
                navigate("/home/auth", { replace: true })
            }

        })
    }, [])
    return (
        <div className='w-screen h-screen flex justify-start items-start overflow-hidden'>
            <Routes>
                <Route path='/home/*' element={<Home />} />
                {/* by default it will navigate to home page */}
                <Route path='*' element={<Navigate to={'/home'} />} />
            </Routes>
        </div>
    )
}

export default App
