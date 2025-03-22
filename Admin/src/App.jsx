import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Admindashboard from './pages/Admindashboard';
import Adminprojectlist from './pages/Adminprojectlist';
import  Editprojects from './pages/EditProject';
import AddProject from './pages/AddProject';
import { Route,Routes } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Routes>
        <Route path='/dashboard' element={<Admindashboard/>}/>
        <Route path='/adminprojectlist' element={<Adminprojectlist/>}/>
        <Route path='/editproject/:id' element={<Editprojects/>}/>
        <Route path='/addproject' element={<AddProject/>}/>
      </Routes>


    </div>
  )
}

export default App
