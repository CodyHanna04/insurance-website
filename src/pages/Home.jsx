import './Home.css';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home-container">
      <section className="hero">
        <h1>Welcome to Peace of Mind Insurance</h1>
        <p>Your trusted partner in protecting what matters most.</p>
        <Link to="/start-policy" className="cta-button">
          Start a Policy
        </Link>
      </section>

      <section className="info-section">
        <h2>Why Choose Us?</h2>
        <p>We specialize in helping seniors find the right life and health insurance policies, with friendly support every step of the way.</p>
        <ul>
          <li>✔️ Easy applications</li>
          <li>✔️ Personalized coverage</li>
          <li>✔️ Real human support</li>
        </ul>
      </section>
    </div>
  );
}
