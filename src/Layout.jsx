import { useLocation } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';

const Layout = () => {
  const location = useLocation();
  const noNavbarRoutes = ['/login', '/register'];

  return (
    <>
      {!noNavbarRoutes.includes(location.pathname) && <Navbar />}
    </>
  );
};

export default Layout;