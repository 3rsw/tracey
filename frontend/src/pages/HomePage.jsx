import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="main-content">
            <NavBar />
            <div className="eighty-width white-text">
                <h4>An external code-tracing tool to scaffold introductory
                    computing learners using principles of cognitive load theory
                </h4>
                <h5>Go to <Link className='light-link' to="/topics">topics</Link> or <Link className='light-link' to="/questions">questions</Link> to get started</h5>
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;