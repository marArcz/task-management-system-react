import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Layout from './Layout'
import { Route, Router, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard'
import { Login } from './pages/Login'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Register } from './pages/Register'
import { useAuthStore } from './AuthStore'
import axios from 'axios'
import { headerTokenConfig } from './Helpers'
import { useProcessingState } from './States'
import { PageLoader } from './Components/PageLoader'
import { CreateTeam } from './pages/CreateTeam'
import { Teams } from './pages/Teams'
import { TeamMembers } from './pages/TeamMembers'
import AddTeamMember from './pages/AddTeamMember'
import { EditTeam } from './pages/EditTeam'
import { CreateTeamProject } from './pages/CreateTeamProject'
import { ViewProject } from './pages/ViewProject'
import { AuthProvider } from './useAuth'
import { RequireAuth } from './RequireAuth'

function App() {
  const location = useLocation();
  const { user, setUser } = useAuthStore();
  const { processing, setProcessing } = useProcessingState();
  const navigate = useNavigate();

  // check if user is authenticated
  useEffect(() => {
    if (user == null) {
      if (localStorage.getItem('user_token') != null) {
        setProcessing(true)
        axios.get('/auth/me', headerTokenConfig)
          .then(res => {
            setProcessing(false)
            setUser(res.data)
            console.log('me:', res.data)
          })
          .catch(err => {
            setProcessing(false)
            navigate('/');
          })
      }
    } else {
      setProcessing(false)
    }
  }, [])



  return (
    <>
      <AuthProvider>
        <PageLoader show={processing} />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<RequireAuth><Dashboard /></RequireAuth>} />
          <Route path='/teams' element={<Teams />} />
          <Route path='/teams/:id' element={<EditTeam />} />
          <Route path='/teams/:id/members' element={<TeamMembers />} />
          <Route path='/teams/:id/members/create' element={<AddTeamMember />} />
          <Route path='/teams/create' element={<CreateTeam />} />
          <Route path='/teams/:id/projects/create' element={<CreateTeamProject />} />
          <Route path='/projects/:id' element={<ViewProject />} />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
