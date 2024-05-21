import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Layout from "./Layout";
import {
  Route,
  Router,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Register } from "./pages/Register";
import { useAuthStore } from "./AuthStore";
import axios from "axios";
import { headerTokenConfig } from "./Helpers";
import { useProcessingState } from "./States";
import { PageLoader } from "./Components/PageLoader";
import { CreateTeam } from "./pages/CreateTeam";
import { Teams } from "./pages/Teams";
import { TeamMembers } from "./pages/TeamMembers";
import AddTeamMember from "./pages/AddTeamMember";
import { EditTeam } from "./pages/EditTeam";
import { CreateTeamProject } from "./pages/CreateTeamProject";
import { ViewProject } from "./pages/ViewProject";
import { AuthProvider } from "./useAuth";
import { RequireAuth } from "./RequireAuth";

function App() {
  const location = useLocation();
  const { user, setUser } = useAuthStore();
  const { processing, setProcessing } = useProcessingState();
  const navigate = useNavigate();

  // check if user is authenticated
  useEffect(() => {
      if (localStorage.getItem("user_token") != null) {
        setProcessing(true);
        axios
          .get("/auth/me", headerTokenConfig)
          .then((res) => {
            setProcessing(false);
            setUser(res.data);
            console.log("me:", res.data);
          })
          .catch((err) => {
            setProcessing(false);
            // navigate("/");
            console.log(err)
          });
      }
   
  }, []);

  return (
    <>
      <AuthProvider>
        <PageLoader show={processing} />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/teams"
            element={
              <RequireAuth>
                <Teams />
              </RequireAuth>
            }
          />
          <Route
            path="/teams/:id"
            element={
              <RequireAuth>
                <EditTeam />
              </RequireAuth>
            }
          />
          <Route
            path="/teams/:id/members"
            element={
              <RequireAuth>
                <TeamMembers />
              </RequireAuth>
            }
          />
          <Route
            path="/teams/:id/members/create"
            element={
              <RequireAuth>
                <AddTeamMember />
              </RequireAuth>
            }
          />
          <Route
            path="/teams/create"
            element={
              <RequireAuth>
                <CreateTeam />
              </RequireAuth>
            }
          />
          <Route
            path="/teams/:id/projects/create"
            element={
              <RequireAuth>
                <CreateTeamProject />
              </RequireAuth>
            }
          />
          <Route
            path="/projects/:id"
            element={
              <RequireAuth>
                <ViewProject />
              </RequireAuth>
            }
          />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
