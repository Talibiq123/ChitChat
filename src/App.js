import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Login from '../src/pages/Login/Login'
import Chat from '../src/pages/Chat/Chat'
import ProfileUpdate from '../src/pages/ProfileUpdate/ProfileUpdate'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';

function App() {

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        navigate('/chat')
      } else {
        navigate('/')
      }
    })
  }, [])

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/' element = { <Login /> } />
        <Route path='/chat' element = { <Chat /> } />
        <Route path='/profile' element = { <ProfileUpdate /> } />
      </Routes>
    </>
  );
}

export default App;
