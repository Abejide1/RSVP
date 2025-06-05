import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaHeart, FaInstagram, FaEnvelope, FaPhone } from 'react-icons/fa';

const StyledFooter = styled.footer`
  background-color: var(--primary-color);
  color: var(--light-text);
  padding: 3rem 0 2rem;
  
  a {
    color: var(--secondary-color);
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: white;
    }
  }
  
  .footer-heading {
    color: var(--secondary-color);
    margin-bottom: 1.2rem;
    font-size: 1.2rem;
    font-weight: 600;
  }
  
  .footer-links {
    list-style: none;
    padding: 0;
    margin: 0;
    
    li {
      margin-bottom: 0.7rem;
    }
  }
  
  .footer-social {
    font-size: 1.5rem;
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }
  
  .footer-copyright {
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 0.9rem;
    text-align: center;
  }
  
  .heart-icon {
    color: var(--secondary-color);
    margin: 0 0.3rem;
  }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <StyledFooter>
      <Container>
        <Row>
          <Col md={4} className="mb-4">
            <h5 className="footer-heading">David & Sukeina</h5>
            <p>Join us to celebrate our special day in beautiful Tangier, Morocco.</p>
          </Col>
          <Col md={4} className="mb-4">
            <h5 className="footer-heading">Quick Links</h5>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/rsvp">RSVP</Link></li>
              <li><Link to="/travel-info">Travel Information</Link></li>
            </ul>
          </Col>
          <Col md={4} className="mb-4">
            <h5 className="footer-heading">Connect With Us</h5>
            <p>Have questions? Reach out to us.</p>
            <div className="footer-social">
              <a href="mailto:davidabejide96@gmail.com" aria-label="Email">
                <FaEnvelope />
              </a>
              <a href="tel:6305232400" aria-label="Phone">
                <FaPhone />
              </a>
              <a href="https://instagram.com/abejide_" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram />
              </a>
            </div>
            <div style={{ marginTop: '1.5rem', textAlign: 'left' }}>
              <a href="/admin-login" style={{ fontSize: '0.9rem', color: '#ccc', textDecoration: 'underline dotted', opacity: 0.6 }}>
                Admin Login
              </a>
            </div>
          </Col>
        </Row>
        <div className="footer-copyright">
          <p>
            © {currentYear} David & Sukeina Wedding | Made with 
            <FaHeart className="heart-icon" /> for our special day
          </p>
        </div>
      </Container>
    </StyledFooter>
  );
};

export default Footer;
