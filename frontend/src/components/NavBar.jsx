import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
    const location = useLocation();

    return (
        <nav>
            <div className="nav-wrapper blue darken-2">
                <Link to="/" className="left flow-text">Tracey</Link>
                <ul className="right">
                    <li>
                        <Link to="/topics" className={`btn ${location.pathname === '/topics' ? 'selected' : 'unselected'}`}>
                            Topics
                        </Link>
                    </li>
                    <li>
                        <Link to="/questions" className={`btn ${location.pathname === '/questions' ? 'selected' : 'unselected'}`}>
                            Questions
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;