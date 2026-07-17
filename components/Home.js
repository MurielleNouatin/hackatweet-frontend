import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { logout } from '../reducers/user';

import Tweet from "./Tweet";
import LastTweets from "./LastTweets";
import Trends from "./Trends";

import styles from '../styles/Home.module.css';

function Home() {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const router = useRouter();
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/tweets")
      .then((res) => res.json())
      .then((data) => setTweets(data.tweets));
  }, []);

  const handleNewTweet = (newTweet) => {
    setTweets([newTweet, ...tweets]);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const goHome = () => {
    router.push('/');
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.leftSection}>
        <img
          src="/logo-twitter.png"
          alt="logo"
          className={styles.logo}
          onClick={goHome}
        />
        <div className={styles.profile}>
          <img src="/profile.JPG" alt="avatar" className={styles.userAvatar} />
          <div className={styles.userText}>
            <p className={styles.firstname}>{user.firstname}</p>
            <p className={styles.username}>@{user.username}</p>
          </div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <main className={styles.centerSection}>
        <h2 className={styles.title}>Home</h2>
        <Tweet onNewTweet={handleNewTweet} />
        <LastTweets tweets={tweets} setTweets={setTweets} />
      </main>

      <div className={styles.rightSection}>
        <Trends tweets={tweets} />
      </div>
    </div>
  );
}

export default Home;