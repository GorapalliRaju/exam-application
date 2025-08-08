import React from 'react';

function StartExam() {
    const start = () => {
        window.location.href = '/exam';
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Welcome to the Exam</h2>
                <button onClick={start} style={styles.button}>
                    Start Exam
                </button>
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
    },
    card: {
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
        width: '300px',
    },
    title: {
        marginBottom: '20px',
        fontSize: '24px',
        color: '#4facfe',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#4facfe',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background 0.3s',
    },
};

export default StartExam;
