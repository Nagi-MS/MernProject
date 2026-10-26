import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const URL = 'http://localhost:5000/api/reviews';

function Home() {
  const [reviews, setReviews] = useState([]);
  const go = useNavigate();

  async function fetchReviews() {
    const response = await fetch(URL);
    const data = await response.json();
    setReviews(data);
  }

  useEffect(() => {
    fetchReviews();
  }, []);

  async function deleteReview(id) {
    if (!confirm('Are you sure you want to delete this?')) return;
    await fetch(`${URL}/${id}`, { method: 'DELETE' });
    fetchReviews();
  }

  return (
    <div>
      <h1 className="heading">Feedback Dashboard</h1>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Course ID</th>
              <th>Course Name</th>
              <th>Duration</th>
              <th>Overall Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty">Nothing here yet. Add some feedback!</td>
              </tr>
            ) : (
              reviews.map((r) => (
                <tr key={r._id}>
                  <td>{r.code}</td>
                  <td>{r.courseName}</td>
                  <td>{r.courseDuration}</td>
                  <td className="gold">
                    {'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}
                  </td>
                  <td>
                    <button className="btn blue" onClick={() => go('/edit/' + r._id)}>Update</button>
                    <button className="btn red" onClick={() => deleteReview(r._id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;