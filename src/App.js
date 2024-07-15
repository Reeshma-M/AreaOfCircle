import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [radius, setRadius] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const validateInput = (radius) => {
        if (!radius) {
            setMessage('Radius must be provided');
            return false;
        }
        if (isNaN(radius)) {
            setMessage('Radius must be numeric');
            return false;
        }
        if (radius < 1 || radius > 100) {
            setMessage('Radius must be between 1 and 100');
            return false;
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsError(false);
        if (!validateInput(radius)) {
            setIsError(true);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/area', null, { params: { radius } });
            setMessage(`The area is: ${response.data}`);
            setIsError(false); // Set to false to display the message in green
        } catch (error) {
            setMessage('Error calculating area');
            setIsError(true);
        }
    };

    return (
        <div className="container">
            <h1>Calculate Area of Circle</h1>
            <form onSubmit={handleSubmit} className="form">
                <input
                    type="text"
                    value={radius}
                    onChange={(e) => setRadius(e.target.value)}
                    placeholder="Enter radius"
                    className="input"
                />
                <button type="submit" className="button">Calculate</button>
            </form>
            <div style={{ color: isError ? 'red' : 'green' }}>
                {message}
            </div>
        </div>
    );
}

export default App;
