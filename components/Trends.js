// components/Trends.js
import { useEffect, useState } from "react";
import styles from '../styles/Trends.module.css';

function Trends() {
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/tweets/trends")
      .then((res) => res.json())
      .then((data) => setTrends(data.trends));
  }, []);

  return (
    <aside className="trends">
      <h3>Trends</h3>
      <ul>
        {trends.map((t, index) => (
          <li key={index}>
            #{t.hashtag} — {t.count}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Trends;
