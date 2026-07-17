// components/Tweet.js
import { useState } from "react";
import { useSelector } from "react-redux";
import "./Tweet.css";

function Tweet({ onNewTweet }) {
  const user = useSelector((state) => state.userInfos.value);
  const [content, setContent] = useState("");

  const handlePostTweet = () => {
    if (content.length === 0 || content.length > 280) {
      return;
    } 

    fetch("http://localhost:3000/tweets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, token: user.token }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          onNewTweet(data.tweet);
          setContent("");
        }
      });
  };

  return (
    <div className="styles.tweet-form">
      <textarea
        maxLength={280}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's up?"
      />
      <p>{content.length}/280</p>
      <button onClick={handlePostTweet}>Tweet</button>
    </div>
  );
}

export default Tweet;
