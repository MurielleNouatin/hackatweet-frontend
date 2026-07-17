// components/LastTweets.js
import { useSelector } from "react-redux";
import styles from '../styles/LastTweets.module.css';


function LastTweets({ tweets }) {
  const user = useSelector((state) => state.user.value);

  const handleLike = (tweetId) => {
    fetch(`http://localhost:3000/tweets/like/${tweetId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: user.token }),
    });
  };

  const handleDelete = (tweetId) => {
    fetch(`http://localhost:3000/tweets/delete/${tweetId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: user.token }),
    });
  };

  return (
    <div className="styles.last-tweets">
      <h3>Last tweets</h3>

      <div className="styles.tweets-list">
        {tweets.map((tweet) => {
          const isOwner = tweet.user.username === user.username;

          return (
            <div key={tweet._id} className="styles.tweet-item">
              <p>
                <strong>{tweet.user.firstname}</strong> @{tweet.user.username}
              </p>

              <p>{tweet.content}</p>

              <div className="styles.tweet-actions">
                <button onClick={() => handleLike(tweet._id)}>
                  ♡ {tweet.likes.length}
                </button>

                {isOwner && (
                  <button
                    className="styles.delete-btn"
                    onClick={() => handleDelete(tweet._id)}
                  >
                    🗑️
                  </button>
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
