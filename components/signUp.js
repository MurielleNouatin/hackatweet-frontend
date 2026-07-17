import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { login } from '../reducers/user';
import styles from '../styles/Login.module.css';

function SignUp({ onClose }) {
  const [firstname, setFirstname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignUp = () => {
    if (!firstname || !username || !password) {
      setError('Please fill in all fields');
      return;
    }

    fetch('https://hackatweet-backend-khaki.vercel.app/login/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstname, username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ username, firstname, token: data.token, userId: data.userId }));
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
        <h2>Create your account</h2>

        <input
          placeholder="First name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
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

        <button className={styles.modalSubmitBtn} onClick={handleSignUp}>
          Sign up
        </button>
      </div>
    </div>
  );
}

export default SignUp;