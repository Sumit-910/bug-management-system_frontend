import './navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import Cookies from 'js-cookie';

import { clearUser } from '../../redux/slices/userSlice';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(clearUser());
        // Cookies.remove('accessToken');
        // Cookies.remove('refreshToken');
        navigate("/login");
    }

    return (
        <>
            <div className="navbar">
                <div className="logo">
                    <Link to="/">Bug Manager</Link>
                </div>
                <div className="menu">
                    <div className="menu-item">
                        <Link to="/">Home</Link>
                    </div>
                    <div className='logout' onClick={handleLogout}>Logout</div>
                </div>
            </div>
            <Outlet />
        </>
    );
};

export default Navbar;
