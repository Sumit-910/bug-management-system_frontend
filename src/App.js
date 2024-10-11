import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';

import Layout from './Layout';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Orgs from './pages/orgs/Orgs';
import Org from "./pages/org/Org";
import Project from './pages/project/Project';
import Bug from './pages/bug/Bug';
import NotFound from './pages/notFound/NotFound';
import { useEffect } from 'react';
import { setUser } from './redux/slices/userSlice';


// const getUser = async(token) => {
//   const url = server + "";
//   const {data} = await fetch(url);
//   return data.json();
// } 

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.accessToken);
  // const user = Cookies.get('accessToken');
  // console.log("user " + user);

  useEffect(() => {
    const accessToken = Cookies.get('accessToken'); // Get access token from cookies
    const refreshToken = Cookies.get('refreshToken'); // Get refresh token from cookies
    const userId = Cookies.get('userId');
    
    if (accessToken && refreshToken) {
      dispatch(setUser({ accessToken, refreshToken, userId })); // Dispatch setUser if tokens are present
    }
  }, []);
  
  
  const requireAuth = (element) => {
    return user ? element : <Navigate to="/login" />;
  };
  const noRequireAuth = (element) => {
    return !user ? element : <Navigate to="/" />;
  };

  return (
    <>
      <Routes>
        <Route path="register" element={noRequireAuth(<Register />)} />
        <Route path="login" element={noRequireAuth(<Login />)} />

        <Route path="/" element={<Layout />}>
          <Route index element={requireAuth(<Orgs />)} />
          <Route path=":orgName" element={requireAuth(<Org />)} />
          <Route path=":orgName/:proName" element={requireAuth(<Project />)} />
          <Route path=":orgName/:proName/:bugName" element={requireAuth(<Bug />)} />
        </Route>

        <Route path="*" element={<NotFound />} />
        <Route path="/notFound" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
