import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Home } from './container'

const App = () => {
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
