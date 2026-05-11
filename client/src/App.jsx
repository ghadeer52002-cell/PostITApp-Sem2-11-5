import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Container } from 'reactstrap'
import Register from './components/Register'
import Home from './components/Home'

function App() {
    return (
    <Container fluid>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/home" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </Container>
  )
}
export default App
