// components/Trends.js
import { useEffect, useState } from "react";
import styles from "../styles/Trends.module.css";

function Trends({ tweets }) {
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/tweets/trends")
      .then((res) => res.json())
      .then((data) => setTrends(data.trends));
  }, [tweets]);

  return (
    <div className={styles.trendsContainer}>
      <h3 className={styles.title}>Trends</h3>
      <div className={styles.trendsBox}>
        {trends.map((t, index) => (
          <div key={index} className={styles.trendItem}>
            <p className={styles.hashtag}>#{t._id}</p>
            <p className={styles.count}>{t.count} Tweet{t.count > 1 ? "s" : ""}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Trends;


 