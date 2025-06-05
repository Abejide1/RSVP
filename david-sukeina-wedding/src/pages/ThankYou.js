import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaCheckCircle, FaHeart } from 'react-icons/fa';

const StyledSection = styled.section`
  padding: 5rem 0;
  
  h2 {
    text-align: center;
    margin-bottom: 2rem;
    color: var(--primary-color);
  }
  
  .confirmation-icon {
    font-size: 5rem;
    color: var(--success-color);
    margin-bottom: 1.5rem;
  }
`;

const ThankYouCard = styled(Card)`
  border: none;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 3rem;
  text-align: center;
  
  .heart-icon {
    color: var(--primary-color);
    margin: 0 0.3rem;
  }
`;

const ThankYou = () => {
  return (
    <StyledSection>
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <ThankYouCard>
              <FaCheckCircle className="confirmation-icon" />
              <h2>Thank You!</h2>
              <p className="lead mb-4">
                Your RSVP has been successfully submitted.
              </p>
              <p className="mb-4">
                We're excited to celebrate our special day with you in Tangier, Morocco.
                We'll be in touch with more details as the date approaches.
              </p>
              <p className="mb-4">
                If your travel plans change or you need to update any information,
                please feel free to revisit the RSVP form or contact us directly.
              </p>
              <p className="fw-bold mb-4">
                With love, <br />
                David & Sukeina <FaHeart className="heart-icon" />
              </p>
              
              <div className="d-flex justify-content-center gap-3 mt-4">
                <Link to="/">
                  <Button variant="secondary">Return to Home</Button>
                </Link>
                <Link to="/travel-info">
                  <Button variant="primary">View Travel Information</Button>
                </Link>
              </div>
            </ThankYouCard>
          </Col>
        </Row>
      </Container>
    </StyledSection>
  );
};

export default ThankYou;
