import React from 'react'
import Navbar  from "./components/Navbar"
import { Routes ,Route, Navigate} from 'react-router-dom'
import HomePage from './components/HomePage'
import LoginPage from './components/LoginPage'
import ProfilePage from './components/ProfilePage'
import SettingsPage from './components/SettingsPage'
import SignUpPage from './components/SignUpPage'
import { useAuthStore } from "./store/useAuthStore.js"
import { Toaster } from 'react-hot-toast'





const App = () => {

  const {authUser , checkAuth , isCheckingAuth,onlineUsers} = useAuthStore();
  console.log({onlineUsers})

  React.useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log("Auth User", {authUser});

  if(isCheckingAuth && !authUser){
    return (
      <div className='flex justify-center items-center h-screen'>
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    )
  }


  return (
    
    <div >
      {/* <span className="loading loading-spinner loading-xl"></span> */}



      <Navbar />
      <Routes>
        <Route path='/' element={authUser ? <HomePage/> : <Navigate to ="/login"/>}> </Route>
        <Route path='/login' element={!authUser ? <LoginPage/> :<Navigate to ="/"/> }> </Route>
        <Route path='/signup' element={!authUser ? <SignUpPage/> :<Navigate to ="/"/> }> </Route>
        <Route path='/profile' element={authUser ? <ProfilePage/> : <Navigate to ="/login"/>}> </Route>
        <Route path='/settings' element={<SettingsPage/>}> </Route>






      </Routes>
      <Toaster/>




    </div>
  )
}

export default App