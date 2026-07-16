import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';
import Dashboard from '../components/Dashboard'

function signUp() {

  const [firstnameInput, setFirstnameInput] = useState('');
  const [usernameInput, setUsernameInput] = useState('');


const handleClick = () => {
        fetch('http://localhost:3000/login/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({firstname: firstnameInput, username: usernameInput}),
        })
            .then(response => response.json())
            .then(userData => {
                setFirstnameInput('');
                setUsernameInput('');
            });
    };


  return (
    <div className={styles.container}>
      {/* <Image src="" alt="" width={200} height={200} /> */}
      <h1>Create your Hackatweet account</h1>
      <div className={styles.inputContainer}>
        <span>Firstname</span>
        <input type="text" id="firstname" onChange={(e)=> setFirstnameInput(e.target.value)} value={firstnameInput}/>
      </div>
    
      <div className={styles.inputContainer}>
        <span>Username</span>
        <input type="Username" id="Username" onChange={(e)=> setUsernameInput(e.target.value)} value={usernameInput} />
      </div>

      <div className={styles.inputContainer}>
        <span>Password</span>
        <input type="password" id="password" onChange={(e)=> setPassword(e.target.value)} value={password} />
      </div>

      <button id="sihnUP" onClick={() => handleClick()}>Sign Up</button>
    </div>
  );
}

export default Home;