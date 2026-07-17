// components/LastTweets.js
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/LastTweets.module.css';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

function LastTweets({ tweets, setTweets }) {
  const user = useSelector((state) => state.user.value);

  const handleLike = (tweetId) => {
    fetch(`http://localhost:3000/tweets/${tweetId}/like`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: user.token }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setTweets((prev) =>
            prev.map((t) => (t._id === tweetId ? data.tweet : t))
          );
        }
      });
  };

  const handleDelete = (tweetId) => {
    fetch(`http://localhost:3000/tweets/${tweetId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: user.token }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setTweets((prev) => prev.filter((t) => t._id !== tweetId));
        }
      });
  };

  function renderContent(content) {
    const parts = content.split(/(#\w+)/g);
    return parts.map((part, i) =>
      part.startsWith('#') ? (
        <span key={i} style={{ color: '#1d9bf0' }}>{part}</span>
      ) : (
        part
      )
    );
  }

  return (
    <div className={styles.lastTweets}>
      <h3>Last tweets</h3>

      <div className={styles.tweetsList}>
        {tweets.map((tweet) => {
          const isOwner = tweet.user.username === user.username;
          const isLiked = tweet.likes.includes(tweet.user._id);

          return (
            <div key={tweet._id} className={styles.tweetItem}>
              <div className={styles.tweetHeader}>
                <img src="/profile.jpg" alt="avatar" className={styles.avatar} />
                <p className={styles.tweetMeta}>
                  <strong>{tweet.user.firstname}</strong>
                  <span className={styles.handle}> @{tweet.user.username}</span>
                  <span className={styles.dot}> · </span>
                  <span className={styles.time}>{dayjs(tweet.date).fromNow()}</span>
                </p>
              </div>

              <p className={styles.content}>{renderContent(tweet.content)}</p>

              <div className={styles.tweetActions}>
                <FontAwesomeIcon
                  icon={faHeart}
                  color={isLiked ? '#F71773' : 'white'}
                  onClick={() => handleLike(tweet._id)}
                  style={{ cursor: 'pointer' }}
                />
                <span style={{ color: isLiked ? '#F71773' : 'white' }}>{tweet.likes.length}</span>

                {isOwner && (
                  <FontAwesomeIcon
                    icon={faTrash}
                    color="white"
                    onClick={() => handleDelete(tweet._id)}
                    style={{ cursor: 'pointer' }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LastTweets;