import { Link } from 'react-router-dom';
import '../styles/home.css';

/**
 * Home Page
 * - Hero section with main title and subtitle
 * - CTA button for registration
 * - Clean, modern design with gradient background
 */
function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">MARC</h1>
          <p className="hero-subtitle">
            Management of Assets, Resources, and Controlling
          </p>
          <p className="hero-description">
            A comprehensive platform designed to streamline asset management,
            optimize resource allocation, and maintain effective control over
            organizational operations.
          </p>
          <Link to="/register" className="cta-button">
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
