import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import axios from 'axios';

function Exam() {
    const [questions, setQuestions] = useState([]);
    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [timer, setTimer] = useState(1800);
    const answersRef = useRef([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:5000/api/exam/questions', {
            headers: { Authorization: 'Bearer ' + token }
        }).then(res => {
            setQuestions(res.data);
            const initialAnswers = res.data.map(q => ({ _id: q._id, answer: null }));
            setAnswers(initialAnswers);
            answersRef.current = initialAnswers;
        }).catch(err => {
            console.log("error==>",err);
            if (err.response && err.response.status === 403) {
                alert("Access denied, Please Login again"); 
                window.location.href = '/login';
            }
        });

        const countdown = setInterval(() => {
            setTimer(t => {
                if (t <= 1) {
                    clearInterval(countdown);
                    submit();
                }
                return t - 1;
            });
        }, 1000);

        return () => clearInterval(countdown);
    }, []);

    const submit = () => {
        const token = localStorage.getItem('token');
        axios.post('http://localhost:5000/api/exam/submit', {
            answers: answersRef.current
        }, {
            headers: { Authorization: 'Bearer ' + token }
        }).then(res => {
            localStorage.setItem('score', res.data.score);
            window.location.href = '/result';
        });
    };

    const select = (index) => {
        const updated = [...answers];
        updated[current].answer = index;
        setAnswers(updated);
        answersRef.current = updated;
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h3 style={styles.timer}>
                    Time Left: {Math.floor(timer / 60)}:{('0' + (timer % 60)).slice(-2)}
                </h3>

                {questions.length > 0 && (
                    <>
                        <h4 style={styles.question}>{questions[current].question}</h4>
                        <div style={styles.options}>
                            {questions[current].options.map((opt, idx) => (
                                <label key={idx} style={styles.option}>
                                    <input
                                        type="radio"
                                        name="opt"
                                        checked={answers[current].answer === idx}
                                        onChange={() => select(idx)}
                                        style={{ marginRight: '10px' }}
                                    />
                                    {opt}
                                </label>
                            ))}
                        </div>
                        <div style={styles.navButtons}>
                            <button
                                style={styles.button}
                                onClick={() => setCurrent(c => Math.max(0, c - 1))}
                                disabled={current === 0}
                            >
                                Previous
                            </button>
                            <button
                                style={styles.button}
                                onClick={() => setCurrent(c => Math.min(questions.length - 1, c + 1))}
                                disabled={current === questions.length - 1}
                            >
                                Next
                            </button>
                            <button style={styles.submitButton} onClick={submit}>Submit</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

const styles = {
    container: {
        height: '100vh',
        background: 'linear-gradient(to right, #4facfe, #4facfe)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
    },
    card: {
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        width: '100%',
        maxWidth: '600px',
    },
    timer: {
        color: '#d32f2f',
        fontSize: '18px',
        marginBottom: '20px',
        textAlign: 'right',
    },
    question: {
        fontSize: '20px',
        marginBottom: '20px',
    },
    options: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginBottom: '30px',
    },
    option: {
        fontSize: '16px',
    },
    navButtons: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#43e97b',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '14px',
        fontWeight: 'bold',
        cursor: 'pointer',
        flex: 1,
    },
    submitButton: {
        padding: '10px 20px',
        backgroundColor: '#2e7d32',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '14px',
        fontWeight: 'bold',
        cursor: 'pointer',
        flex: 1,
    }
};

export default Exam;
