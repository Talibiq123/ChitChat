import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from '../src/pages/Login/Login'
import Chat from '../src/pages/Chat/Chat'
import ProfileUpdate from '../src/pages/ProfileUpdate/ProfileUpdate'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
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
