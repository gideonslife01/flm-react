// src/App.tsx
import { useEffect, useRef, useState } from 'react';
import './App.css';

type User = {
  login: { uuid: string };
  name: { first: string; last: string };
  picture: { medium: string };
  email: string;
  location: { city: string; country: string };
};

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observerTarget = useRef<HTMLDivElement>(null);

  const fetchUsers = async (pageNum: number) => {
    if (!hasMore || loading) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://randomuser.me/api/?page=${pageNum}&results=20&seed=abc`
      );
      const data = await res.json();

      if (data.results.length === 0) {
        setHasMore(false);
        return;
      }

      setUsers((prev) => [...prev, ...data.results]);
      setPage(pageNum + 1);
    } catch (err) {
      console.error('유저 데이터를 불러오지 못했습니다:', err);
    } finally {
      setLoading(false);
    }
  };

  // 최초 로딩
  useEffect(() => {
    fetchUsers(1);
  }, []);

  // Intersection Observer 설정
  useEffect(() => {
    if (!observerTarget.current || !hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchUsers(page);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(observerTarget.current);

    return () => {
      observer.disconnect();
    };
  }, [users, loading, hasMore, page]);

  return (
    <div className="app">
      <h1>Random Users ∞ Scroll</h1>

      <div className="user-list">
        {users.map((user) => (
          <div key={user.login.uuid} className="user-card">
            <img src={user.picture.medium} alt="profile" />
            <div className="info">
              <h3>
                {user.name.first} {user.name.last}
              </h3>
              <p>{user.email}</p>
              <p>
                {user.location.city}, {user.location.country}
              </p>
            </div>
          </div>
        ))}

        {/* 로딩 중 표시 */}
        {loading && <div className="loading">로딩 중...</div>}

        {/* 감지용 빈 div */}
        {hasMore && <div ref={observerTarget} className="sentinel" />}

        {!hasMore && users.length > 0 && (
          <div className="end-message">더 이상 유저가 없습니다 😄</div>
        )}
      </div>
    </div>
  );
}

export default App;
