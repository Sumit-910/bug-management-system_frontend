import './navbar.css';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
const Navbar = () => {
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
                    <div className="menu-item">
                        <Link to="/login">Login</Link>
                    </div>
                    <div className="menu-item">
                        <Link to="/register">Register</Link>
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    );
};

export default Navbar;
