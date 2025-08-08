import React from 'react';

function Result() {
    const score = localStorage.getItem('score');

    return (
        <div style={containerStyle}>
            <div style={boxStyle}>
                <h2 style={headingStyle}>Your Score</h2>
                <div style={scoreStyle}>{score}</div>
            </div>
        </div>
    );
}

export default Result;

const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#4facfe',
    fontFamily: 'Arial, sans-serif',
};

const boxStyle = {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '300px',
};

const headingStyle = {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
};

const scoreStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#4CAF50',
};
