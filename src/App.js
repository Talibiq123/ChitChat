import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Login from '../src/pages/Login/Login'
import Chat from '../src/pages/Chat/Chat'
import ProfileUpdate from '../src/pages/ProfileUpdate/ProfileUpdate'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import { AppContext } from './context/AppContext';

function App() {

  const navigate = useNavigate();
  const {loadUserData} = useContext(AppContext);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        navigate('/chat')
        // console.log(user);
        await loadUserData(user.uid);
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
