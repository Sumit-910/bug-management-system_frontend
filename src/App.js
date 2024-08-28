import './App.css';
import { Routes, Route } from "react-router-dom";

import Layout from './Layout';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
// import Home from "./pages/home/Home";
import Orgs from './pages/orgs/Orgs';
import Org from "./pages/org/Org";
import Project from './pages/project/Project';
import Bug from './pages/bug/Bug';
import NotFound from './pages/notFound/NotFound';

function App() {
  return (
    <>
      <Routes>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<Orgs />} />
          <Route path=":orgName" element={<Org />} />
          <Route path=":orgName/:proName" element={<Project />} />
          <Route path=":orgName/:proName/:bugName" element={<Bug />} />
        </Route>

        <Route path="*" element={<NotFound />} />
        <Route path="/notFound" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
