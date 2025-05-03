import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Admindashboard from './pages/Admindashboard';
import Adminprojectlist from './pages/Adminprojectlist';
import  Editprojects from './pages/EditProject';
import AddProject from './pages/AddProject';
import Users from './pages/Users';
import { Route,Routes } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Routes>
        <Route path='/admin-dashboard' element={<Admindashboard/>}/>
        <Route path='/adminprojectlist' element={<Adminprojectlist/>}/>
        <Route path='/editproject/:id' element={<Editprojects/>}/>
        <Route path='/addproject' element={<AddProject/>}/>
        <Route path='/admin/users' element={<Users/>}/>
      </Routes>


    </div>
  )
}

export default App
