import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav>
            <div className="nav-wrapper orange darken-2">
                <Link to="/" className="brand-logo">Tracey</Link>
                <ul className="right hide-on-med-and-down">
                    <li><Link to="/topics" className="btn orange darken-4">Topics</Link></li>
                    <li><Link to="/questions" className="btn orange darken-4">Questions</Link></li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;