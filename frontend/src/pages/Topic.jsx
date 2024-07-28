import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import QuestionTable from "../components/QuestionTable";
import qnService from '../services/qn';
import { Link, useParams } from 'react-router-dom';

const Topic = () => {
    const [questions, setQuestions] = useState([]);

    const { topic } = useParams();

    useEffect(() => {
        qnService.getListQns().then(qns => {
            setQuestions(qns.filter(qn => qn.tags.includes(topic)))
        });
    }, []);

    return (
        <div className="main-content">
            <NavBar />
            <h3 className="eighty-width blue-text text-lighten-4" >{topic}</h3>
            {questions.length === 0 
                ? <p className="eighty-width">No matching questions for topic {topic}</p> 
                : <QuestionTable questions={questions}/>
            }
            <Footer />
        </div>
    );
};

export default Topic;