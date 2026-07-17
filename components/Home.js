import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { logout } from '../reducers/user';
import Link from 'next/link';

import Tweet from "./Tweet";
import LastTweets from "./LastTweets";
import Trends from "./Trends";

import styles from '../styles/Home.module.css';

function Home() {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
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

  return (
    <div className={styles.homeContainer}>
      <div className={styles.leftSection}>
        <div className={styles.logo}>
          <Link href="/home">
            <img src="/logo-twitter.png" alt="logo" />
          </Link>
        </div>
        <div className={styles.profile}>
          <p className={styles.firstname}>{user.firstname}</p>
          <p className={styles.username}>@{user.username}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <main className={styles.centerSection}>
        <h2>Home</h2>
        <Tweet onNewTweet={handleNewTweet} />
        <LastTweets tweets={tweets} setTweets={setTweets} />
      </main>

      <Trends tweets={tweets} />
    </div>
  );
}

export default Home;