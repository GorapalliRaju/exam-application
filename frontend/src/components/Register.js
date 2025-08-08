import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Make sure react-router-dom is installed

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const register = async () => {
        try {
            await axios.post('http://localhost:5000/api/auth/register', { username, password });
            alert('Registered!');
        } catch (error) {
            alert('Registration failed!');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Create an Account</h2>
                <input
                    placeholder="Username"
                    style={styles.input}
                    onChange={e => setUsername(e.target.value)}
                />
                <input
                    placeholder="Password"
                    type="password"
                    style={styles.input}
                    onChange={e => setPassword(e.target.value)}
                />
                <button style={styles.button} onClick={register}>
                    Register
                </button>

                <p style={styles.loginText}>
                    Already have an account?{' '}
                    <Link to="/login" style={styles.loginLink}>
                        Login
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
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
    },
    title: {
        marginBottom: '20px',
        textAlign: 'center',
        color: '#4facfe',
    },
    input: {
        padding: '10px',
        marginBottom: '15px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '16px',
    },
    button: {
        padding: '10px',
        backgroundColor: '#4facfe',
        border: 'none',
        borderRadius: '5px',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    loginText: {
        marginTop: '15px',
        textAlign: 'center',
        fontSize: '14px',
        color: '#555',
    },
    loginLink: {
        color: '#4facfe',
        textDecoration: 'none',
        fontWeight: 'bold',
    },
};

export default Register;
