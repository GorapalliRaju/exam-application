import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import StartExam from './components/StartExam';
import Exam from './components/Exam';
import Result from './components/Result';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/start" element={<StartExam />} />
                <Route path="/exam" element={<Exam />} />
                <Route path="/result" element={<Result />} />
            </Routes>
        </Router>
    );
}

export default App;
