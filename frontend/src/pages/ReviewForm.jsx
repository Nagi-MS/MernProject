import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const URL = 'http://localhost:5000/api/reviews';

function ReviewForm() {
  const [courseName, setCourseName] = useState('');
  const [courseDuration, setCourseDuration] = useState('');
  const [remarks, setRemarks] = useState('');
  const [stars, setStars] = useState(0);

  const { id } = useParams();
  const go = useNavigate();

  
  useEffect(() => {
    if (!id) return;
    fetch(`${URL}/${id}`)
      .then((r) => r.json())
      .then((d) => {
        setCourseName(d.courseName);
        setCourseDuration(d.courseDuration);
        setRemarks(d.remarks);
        setStars(d.stars);
      });
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (stars === 0) {
      alert('Please pick a rating');
      return;
    }
    const body = JSON.stringify({ courseName, courseDuration, remarks, stars });
    await fetch(id ? `${URL}/${id}` : URL, {
      method: id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });
    go('/');
  }

  return (
    <div className="card">
      <h1 className="heading">{id ? 'Update Feedback' : 'Add Feedback'}</h1>
      <form onSubmit={handleSubmit}>
        <label>Course Name</label>
        <input value={courseName} onChange={(e) => setCourseName(e.target.value)} required />

        <label>Course Duration</label>
        <input
          value={courseDuration}
          onChange={(e) => setCourseDuration(e.target.value)}
          placeholder="e.g. 8 weeks"
        />

        <label>Feedback Comments</label>
        <textarea rows="4" value={remarks} onChange={(e) => setRemarks(e.target.value)} required />

        <label>Feedback Rating</label>
        <div className="star-row">
          {[1, 2, 3, 4, 5].map((n) => (
            <span
              key={n}
              className={n <= stars ? 'star on' : 'star'}
              onClick={() => setStars(n)}
            >
              ★
            </span>
          ))}
        </div>

        <button className="btn blue big" type="submit">
          {id ? 'Save Changes' : 'Submit Feedback'}
        </button>
      </form>
    </div>
  );
}

export default ReviewForm;