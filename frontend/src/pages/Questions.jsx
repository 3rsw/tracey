import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import QuestionTable from "../components/QuestionTable";
import qnService from '../services/qn';
import { Link } from 'react-router-dom';

const Questions = () => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        qnService.getListQns().then(qns => {
            setQuestions(qns);
            console.log('Questions:', qns);
        });
    }, []);

    return (
        <div className="main-content">
            <NavBar />
            <QuestionTable questions={questions}/>
            <Footer />
        </div>
    );
};

export default Questions;