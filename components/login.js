import { useState } from 'react';
import styles from '../styles/Login.module.css';

function Login() {
  const [modal, setModal] = useState(null);

  return (
    <div className={styles.container}>
      <div className={styles.leftImage}></div>

      <div className={styles.rightPanel}>
        <img src="/logo-twitter.png" alt="logo" className={styles.logo} />

        <h1 className={styles.title}>See what's happening</h1>

        <h2 className={styles.subtitle}>Join Hackatweet today.</h2>

        <button className={styles.signupBtn} onClick={() => setModal('signup')}>
          Sign up
        </button>

        <p className={styles.alreadyHave}>Already have an account?</p>

        <button className={styles.signinBtn} onClick={() => setModal('signin')}>
          Sign in
        </button>
      </div>
    </div>
  );
}

export default Login;