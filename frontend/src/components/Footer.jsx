import '../styles/footer.css';

/**
 * Footer Component
 * - Contact information
 * - Professional minimal design
 * - Displayed on all pages
 */
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-section">
            <h3 className="footer-title">MARC</h3>
            <p className="footer-subtitle">
              Management of Assets, Resources, and Controlling
            </p>
          </div>

          {/* Contact Section */}
          <div className="footer-section">
            <h4 className="footer-heading">Contact</h4>
            <div className="contact-info">
              <p>
                <strong>Email:</strong>{' '}
                <a href="mailto:contact@marc.com">contact@marc.com</a>
              </p>
              <p>
                <strong>Phone:</strong>{' '}
                <a href="tel:+919000000000">+91 90000 00000</a>
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p>&copy; {currentYear} MARC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
