// components/Home.js
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Tweet from './Tweet';
import LastTweets from './LastTweets';
import Trends from './Trends';
import Login from './login';


function Home() {
  const user = useSelector((state) => state.user.value);
  const [tweets, setTweets] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/tweets') // adapte le port du backend de Murielle
      .then((res) => res.json())
      .then((data) => setTweets(data.tweets));
  }, []);

  const handlePostTweet = () => {
    if (content.length === 0 || content.length > 280) return;

    fetch('http://localhost:3000/tweets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, token: user.token }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTweets([data.tweet, ...tweets]);
        setContent('');
      });
  };

  function logout() {
    return <Login/>
  }
  return (
    <div>
  
      <div className="user-section">
        <div className="logo" onClick={() => window.location.href = "/home"}></div>
        <div className="profile">
          <p className="firstname">{firstname}</p>
          <p className="username">@{username}</p>
          <button onClick={() => logout()}>Logout</button>
        </div>

      </div>

      <div>
        <textarea
          maxLength={280}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's up?"
        />
        <p>{content.length}/280</p>
        <button onClick={handlePostTweet}>Tweet</button>

        <LastTweets tweets={tweets} currentUsername={user.username} token={user.token} />
      </div>

      <Trends tweets={tweets} />
    </div>
  );
}

export default Home;