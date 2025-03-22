import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Admindashboard from './pages/Admindashboard';
import Adminprojectlist from './pages/Adminprojectlist';
import  Editprojects from './pages/EditProject';
import AddProject from './pages/AddProject';
<<<<<<< HEAD
import Goal from './pages/goals/AddGoals';
import AdminGoal from './pages/goals/AdminGoalList'
import EditGoal from './pages/goals/EditGoal';
=======
import Users from './pages/Users';
>>>>>>> 85db98f6ae7bad0b5acdf5f080d316ba1d9417a2
import { Route,Routes } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Routes>
        <Route path='/' element={<Admindashboard/>}/>
        <Route path='/adminprojectlist' element={<Adminprojectlist/>}/>
        <Route path='/editproject/:id' element={<Editprojects/>}/>
        <Route path='/addproject' element={<AddProject/>}/>
<<<<<<< HEAD
        <Route path='/addGoal' element={<Goal/>}/>
        <Route path='/adminGoal' element={<AdminGoal/>}/>
        <Route path='/editGoal/:id' element={<EditGoal/>}/>
=======
        <Route path='/admin/users' element={<Users/>}/>
>>>>>>> 85db98f6ae7bad0b5acdf5f080d316ba1d9417a2
      </Routes>


    </div>
  )
}

export default App
