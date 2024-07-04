import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import qnService from '../services/qn';
import { Link } from 'react-router-dom';

const Topics = () => {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        qnService.getTopics().then(tcs => {
            console.log(tcs);
            setTopics(tcs);
        });
    }, []);


    return (
        <div className="main-content">
            <NavBar />
            <div className="eighty-width">
                <h3>Topics</h3>
                <ul>
                    {topics.map((topic, index) => (
                        <li key={index}>
                            <Link to={`/topic/${topic}`}>{topic}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <Footer />
        </div>
    );
};

export default Topics;