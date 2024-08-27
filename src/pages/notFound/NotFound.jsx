import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
    return (
        <>
            <div className="mainContainer">
                <div className="not-found-container">
                    <h1>404</h1>
                    <h2>Oops! Page not found.</h2>
                    <p>Sorry, the page you're looking for doesn't exist.</p>
                    <Link to="/" className="home-link">
                        Go back home
                    </Link>
                </div>
            </div>
        </>
    );
};

export default NotFound;
