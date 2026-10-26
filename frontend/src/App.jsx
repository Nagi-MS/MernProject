import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import ReviewForm from './pages/ReviewForm';

function App() {
  return (
    <div>
      <nav className="topbar">
        <h2 className="brand">FeedbackPanel</h2>
        <div className="links">
          <NavLink to="/" end>Dashboard</NavLink>
          <NavLink to="/add">Add Feedback</NavLink>
        </div>
      </nav>

      <main className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<ReviewForm />} />
          <Route path="/edit/:id" element={<ReviewForm />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;