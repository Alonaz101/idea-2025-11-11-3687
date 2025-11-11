import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [mood, setMood] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authMode, setAuthMode] = useState('login');

  const fetchRecipes = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/recipes?mood=${mood}`);
      setRecipes(res.data);
    } catch (err) {
      alert('Error fetching recipes');
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      setToken(res.data.token);
      alert('Logged in!');
    } catch (err) {
      alert('Login failed');
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', { username: email, email, password });
      setToken(res.data.token);
      alert('Signed up!');
    } catch (err) {
      alert('Signup failed');
    }
  };

  return (
    <div>
      <h1>Mood-Based Recipe Recommendation</h1>

      {token ? (
        <>
          <label>Enter your mood: </label>
          <input value={mood} onChange={e => setMood(e.target.value)} placeholder="e.g. happy" />
          <button onClick={fetchRecipes}>Get Recipes</button>

          <h2>Recipes</h2>
          <ul>
            {recipes.map(r => (
              <li key={r._id}>{r.title}</li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <h2>{authMode === 'login' ? 'Login' : 'Signup'}</h2>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          {authMode === 'login' ? (
            <button onClick={handleLogin}>Login</button>
          ) : (
            <button onClick={handleSignup}>Signup</button>
          )}
          <button onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}>
            Switch to {authMode === 'login' ? 'Signup' : 'Login'}
          </button>
        </>
      )}
    </div>
  );
}

export default App;
