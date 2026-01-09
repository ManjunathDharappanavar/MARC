import '../styles/home.css';

/**
 * About Page
 * - Professional description of the MARC system
 * - Mission and features overview
 */
function About() {
  return (
    <div className="about">
      <section className="about-section">
        <h1 className="about-title">About MARC</h1>
        
        <div className="about-content">
          <div className="about-card">
            <h2>What is MARC?</h2>
            <p>
              MARC (Management of Assets, Resources, and Controlling) is an
              enterprise-level platform designed to help organizations effectively
              manage their assets, allocate resources efficiently, and maintain
              comprehensive control over their operations.
            </p>
          </div>

          <div className="about-card">
            <h2>Our Mission</h2>
            <p>
              To empower organizations with intelligent tools and insights that
              enable better decision-making, reduce operational overhead, and
              maximize resource utilization across all business functions.
            </p>
          </div>

          <div className="about-card">
            <h2>Key Features</h2>
            <ul className="features-list">
              <li>Asset Tracking & Management</li>
              <li>Resource Allocation & Optimization</li>
              <li>Real-time Monitoring & Analytics</li>
              <li>Comprehensive Reporting</li>
              <li>User-friendly Dashboard</li>
              <li>Secure Data Management</li>
            </ul>
          </div>

          <div className="about-card">
            <h2>Why Choose MARC?</h2>
            <p>
              With years of industry experience, MARC provides a robust,
              scalable, and intuitive solution for organizations of all sizes.
              Our platform is built with enterprise-grade security and
              reliability, ensuring your critical business operations run
              smoothly and efficiently.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
