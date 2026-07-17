// components/Tweet.js
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from '../styles/Tweet.module.css';
import { setDraft, clearDraft } from "../reducers/tweetDraft";


function Tweet({ onNewTweet }) {
  const user = useSelector((state) => state.user.value);
  const content = useSelector((state) => state.tweetDraft.value);

  const dispatch = useDispatch();


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
          dispatch(clearDraft());
        }
      });
  };

  return (
    <div className="styles.tweet-form">
      <textarea
        maxLength={280}
        value={content}
        onChange={(e) => dispatch(setDraft(e.target.value))}
        placeholder="What's up?"
      />
      <p>{content.length}/280</p>
      <button onClick={handlePostTweet}>Tweet</button>
    </div>
  );
}

export default Tweet;
