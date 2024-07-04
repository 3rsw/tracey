import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import qnService from '../services/qn';
import { Link } from 'react-router-dom';

const QuestionTable = ({ questions }) => {

    const sortByDifficulty = () => {
        const sortedQuestions = [...questions].sort((a, b) => sortOrder ? a.difficulty - b.difficulty : b.difficulty - a.difficulty);
        setQuestions(sortedQuestions);
        setSortOrder(!sortOrder);
    };

    const sortByName = () => {
        const sortedQuestions = [...questions].sort((a, b) => sortOrder ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
        setQuestions(sortedQuestions);
        setSortOrder(!sortOrder);
    };

    return (
        <table className="centered" style={{ width: '80%', margin: '0 auto' }}>
            <thead>
                <tr>
                    <th>
                        Name
                        <button onClick={sortByName}><i className="material-icons">swap_vert</i></button>
                    </th>
                    <th>
                        Difficulty
                        <button onClick={sortByDifficulty}><i className="material-icons">swap_vert</i></button>
                    </th>
                    <th>Topic</th>
                </tr>
            </thead>
            <tbody>
                {questions.map((question, index) => (
                    <tr key={index}>
                        <td><Link to={`/question/${question._id}`}>{question.name}</Link></td>
                        <td> {"*".repeat(question.difficulty)}</td>
                        <td>{question.tags.map((tag, index) => (
                            <span key={index}>
                                <Link to={`/topic/${tag}`}>{tag}</Link>
                                {index < question.tags.length - 1 ? ", " : ""}
                            </span>
                        ))}</td>
                    </tr>
                ))}
            </tbody>
        </table>

    );
};

export default QuestionTable;