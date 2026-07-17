// components/Home.js
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import Tweet from "./Tweet";
import LastTweets from "./LastTweets";
import Trends from "./Trends";

import styles from '../styles/Home.module.css';

function Home() {
  const user = useSelector((state) => state.userInfos.value);
  //const [tweets, setTweets] = useState([]);

  if (!user.token) {
    window.location.href = "/";
    return null;
  }

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  useEffect(() => {
    fetch("http://localhost:3000/tweets")
      .then((res) => res.json())
      .then((data) => setTweets(data.tweets));
  }, []);

  const handleNewTweet = (newTweet) => {
    setTweets([newTweet, ...tweets]);
  };

  return (
    <div className="styles.home-container">

      {/* bloc gauche */}
      <div className="styles.left-section">
        <div className="styles.logo">
          <img src="/logo-twitter.png" alt="logo" className={styles.modallogo} />
        </div>
        <div className="styles.profile">
          <p className="styles.firstname">{user.firstname}</p>
          <p className="styles.username">@{user.username}</p>
          <button onClick={logout}>Logout</button>
        </div>
      </div>

      {/* bloc centrée */}
      <main className="styles.center-section">
        <Tweet onNewTweet={handleNewTweet} />
        <LastTweets tweets={tweets} />
      </main>

      {/* bloc droit */}
      <Trends />
    </div>
  );
}

export default Home;


