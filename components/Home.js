// components/Home.js
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import Tweet from "./Tweet";
import LastTweets from "./LastTweets";
import Trends from "./Trends";

import "./Home.css";

function Home() {
  const user = useSelector((state) => state.userInfos.value);
  const [tweets, setTweets] = useState([]);

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
    <div className="home-container">

      {/* LEFT SECTION */}
      <div className="left-section">
        <div className="logo">🕊️</div>

        <div className="profile">
          <p className="firstname">{user.firstname}</p>
          <p className="username">@{user.username}</p>
          <button onClick={logout}>Logout</button>
        </div>
      </div>

      {/* CENTER SECTION */}
      <main className="center-section">
        <Tweet onNewTweet={handleNewTweet} />
        <LastTweets tweets={tweets} />
      </main>

      {/* RIGHT SECTION */}
      <Trends />
    </div>
  );
}

export default Home;


