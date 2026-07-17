import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import LastTweets from './LastTweets';
import Trends from './Trends';
import styles from '../styles/Hashtag.module.css';

function Hashtag() {
  const router = useRouter();
  const { name } = router.query;
  const user = useSelector((state) => state.user.value);

  const [searchValue, setSearchValue] = useState('');
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    if (name) {
      setSearchValue(name);
      fetch(`http://localhost:3000/tweets/hashtag/${name}`)
        .then((res) => res.json())
        .then((data) => setTweets(data.tweets));
    }
  }, [name]);

  const handleSearch = () => {
    if (searchValue.trim()) {
      router.push(`/hashtag/${searchValue.trim()}`);
    }
  };

  const goHome = () => {
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <img
          src="/logo-twitter.png"
          alt="logo"
          className={styles.logo}
          onClick={goHome}
        />
        <div className={styles.userInfo}>
          <p className={styles.username}>{user.firstname}</p>
          <p className={styles.handle}>@{user.username}</p>
        </div>
      </div>

      <div className={styles.middlePanel}>
        <h1 className={styles.title}>Hashtag</h1>

        <input
          type="text"
          className={styles.searchInput}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Search hashtag..."
        />

        {tweets.length === 0 ? (
          <p className={styles.noResults}>No tweets found with #{name}</p>
        ) : (
          <LastTweets tweets={tweets} currentUsername={user.username} />
        )}
      </div>

      <div className={styles.rightPanel}>
        <Trends />
      </div>
    </div>
  );
}

export default Hashtag;