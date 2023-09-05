import React, { useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Register from './components/Register';
import MainPage from './components/MainPage';
import Profile from './components/Profile';
import MyModel from './components/MyModel';

function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/main' element={<MainPage/>}/>
        <Route path='/main/profile' element={<Profile/>} />
        <Route path='/main/mymodels' element={<MyModel/>} />

      </Routes>
    </div>
  );
}

export default App;
