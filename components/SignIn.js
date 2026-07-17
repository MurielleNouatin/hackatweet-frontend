import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { login } from '../reducers/user';
import styles from '../styles/Login.module.css';

function SignIn({ onClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignIn = () => {
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    fetch('http://localhost:3000/login/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ username, firstname: data.firstname, token: data.token }));
          router.push('/');
        } else {
          setError(data.error);
        }
      });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>×</button>
        <img src="/logo-twitter.png" alt="logo" className={styles.modallogo} />
        <h2>Connect to Hackatweek</h2>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className={styles.error}>{error}</p>}

        <button className={styles.modalSubmitBtn} onClick={handleSignIn}>
          Sign in
        </button>
      </div>
    </div>
  );
}

export default SignIn;