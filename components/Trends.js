import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../styles/Trends.module.css";

function Trends({ tweets }) {
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    fetch("https://hackatweet-backend-khaki.vercel.app/tweets/trends")
      .then((res) => res.json())
      .then((data) => setTrends(data.trends));
  }, [tweets]);

  return (
    <div className={styles.trendsContainer}>
      <h3 className={styles.title}>Trends</h3>

      <div className={styles.trendsBox}>
        {trends.map((t, index) => (
          <div key={index} className={styles.trendItem}>
            
            {/* 🔥 Hashtag cliquable avec Next.js */}
            <Link href={`/hashtag/${t._id}`}>
              <p className={styles.hashtag} style={{ cursor: "pointer" }}>
                #{t._id}
              </p>
            </Link>

            <p className={styles.count}>
              {t.count} Tweet{t.count > 1 ? "s" : ""}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Trends;



 