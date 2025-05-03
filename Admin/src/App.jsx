import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Admindashboard from './pages/Admindashboard';
import Adminprojectlist from './pages/Adminprojectlist';
import Editprojects from './pages/EditProject';
import AddProject from './pages/AddProject';
import Goal from './pages/goals/AddGoals';
import AdminGoal from './pages/goals/AdminGoalList';
import EditGoal from './pages/goals/EditGoal';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Donations from './pages/Donations';
import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import DonationActions from './pages/DonationActions';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Routes>
        <Route path='/admin' element={<Admindashboard />} />
        <Route path='/adminprojectlist' element={<Adminprojectlist />} />
        <Route path='/editproject/:id' element={<Editprojects />} />
        <Route path='/addproject' element={<AddProject />} />
        <Route path='/addGoal' element={<Goal />} />
        <Route path='/adminGoal' element={<AdminGoal />} />
        <Route path='/editGoal/:id' element={<EditGoal />} />
        <Route path='/admin/users' element={<Users />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/donations' element={<Donations />} />
        <Route path='/donationactions' element={<DonationActions/>} />
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
