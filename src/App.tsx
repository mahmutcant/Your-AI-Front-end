import React from 'react';
import './App.css';
import Login from './components/Login';
import { Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import MainPage from './components/MainPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/main' element={<MainPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
