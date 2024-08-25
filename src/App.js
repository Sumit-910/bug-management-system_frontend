import './App.css';
import { Routes, Route } from "react-router-dom";

import Layout from './Layout';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
// import Home from "./pages/home/Home";
import Orgs from './pages/orgs/Orgs';
import Org from "./pages/org/Org";
import Projects from './pages/projects/Projects';
import Project from './pages/project/Project';
import Bugs from './pages/bugs/Bugs';
import Bug from './pages/bug/Bug';

function App() {
  return (
    <>
      <Routes>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />

        <Route path="/" element={<Layout />}>
          <Route path="">
            <Route index element={<Orgs />} />
            <Route path=":orgId" element={<Org />} />
          </Route>

          <Route path="project">
            <Route index element={<Projects />} />
            <Route path=":proId" element={<Project />} />
          </Route>

          <Route path="bug">
            <Route index element={<Bugs />} />
            <Route path=":bugId" element={<Bug />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
