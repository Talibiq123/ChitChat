import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from '../src/pages/Login/Login'
import Chat from '../src/pages/Chat/Chat'
import ProfileUpdate from '../src/pages/ProfileUpdate/ProfileUpdate'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element = { <Login /> } />
        <Route path='/chat' element = { <Chat /> } />
        <Route path='/profile' element = { <ProfileUpdate /> } />
      </Routes>
    </>
  );
}

export default App;
