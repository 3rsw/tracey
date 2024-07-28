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
                <div className="row">
                    {topics.map((topic, index) => (
                        <div className="col s2" key={index}>
                            <Link to={`/topic/${topic}`}>
                                <div className="card-panel blue darken-4 center-align white-text">
                                    {topic}
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Topics;