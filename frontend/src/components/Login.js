import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', {
                username,
                password,
            });
            localStorage.setItem('token', res.data.token);
            window.location.href = '/start';
        } catch (error) {
            alert('Login failed!');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                />
                <button onClick={login} style={styles.button}>
                    Login
                </button>
                <p style={styles.redirectText}>
                    Don’t have an account?{' '}
                    <Link to="/" style={styles.link}>
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}


const styles = {
    container: {
        height: '100vh',
        background: 'linear-gradient(to right, #4facfe, #00f2fe)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
    },
    title: {
        textAlign: 'center',
        marginBottom: '20px',
        fontSize: '24px',
        color: '#4facfe',
    },
    input: {
        padding: '10px',
        marginBottom: '15px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '16px',
    },
    button: {
        padding: '10px',
        backgroundColor: '#4facfe',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background 0.3s',
    },
    redirectText: {
        marginTop: '15px',
        fontSize: '14px',
        textAlign: 'center',
    },
    link: {
        color: '#4facfe',
        fontWeight: 'bold',
        textDecoration: 'none',
    },
};

export default Login;
