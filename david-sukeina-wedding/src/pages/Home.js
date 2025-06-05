import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaCalendarAlt, FaMapMarkerAlt, FaHeart } from 'react-icons/fa';

import proposalImg from '../assets/proposal.jpg';
import ringImg from '../assets/ring.jpeg';

const HeroSection = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${proposalImg});
  background-size: cover;
  background-position: center;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  padding: 2rem;
  margin-bottom: 3rem;

  h1 {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    color: white;
    font-weight: 700;
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
    color: var(--secondary-color);
  }

  .hero-date {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    color: var(--secondary-color);
  }
`;


const StyledCard = styled(Card)`
  border: none;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: stretch;

  &:hover {
    transform: translateY(-10px);
  }

  .card-img-top {
    height: 200px;
    object-fit: cover;
  }

  .card-title {
    color: var(--primary-color);
    font-weight: 600;
  }

  .card-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: var(--primary-color);
  }

  .card-body {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
`;

const StyledSection = styled.section`
  padding: 4rem 0;
  
  h2 {
    text-align: center;
    margin-bottom: 3rem;
  }
  
  &.bg-light {
    background-color: var(--secondary-color);
  }
`;

const CountdownContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 2rem 0;
  
  .countdown-item {
    background: var(--primary-color);
    color: white;
    border-radius: 10px;
    padding: 1.5rem;
    margin: 0.5rem;
    min-width: 120px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    
    .number {
      font-size: 2.5rem;
      font-weight: bold;
      display: block;
    }
    
    .text {
      font-size: 1rem;
      text-transform: uppercase;
    }
  }
`;

// You would need to replace these with actual wedding details
const weddingDate = new Date('2026-08-06T16:00:00');
const weddingLocation = 'Tangier, Morocco';

const Home = () => {
  // Countdown functionality
  const [countdown, setCountdown] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();
      
      if (difference < 0) {
        clearInterval(interval);
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setCountdown({ days, hours, minutes, seconds });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <>
      <HeroSection>
        <h1>David & Sukeina</h1>
        <h2>We're Getting Married!</h2>
        <p className="hero-date">
          <FaCalendarAlt style={{ marginRight: '0.5rem' }} />
          {weddingDate.toLocaleDateString('en-US', { 
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
        <p className="hero-location">
          <FaMapMarkerAlt style={{ marginRight: '0.5rem' }} />
          {weddingLocation}
        </p>
        <Link to="/create-account">
          <Button variant="primary" size="lg" className="mt-4">
            RSVP Now
          </Button>
        </Link>
      </HeroSection>
      
      <StyledSection>
        <Container>
          <h2>Countdown to Our Big Day</h2>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            <img
              src={ringImg}
              alt="Wedding placeholder"
              style={{ width: '320px', height: '200px', objectFit: 'cover', borderRadius: '18px', border: '3px solid var(--primary-color)', boxShadow: '0 4px 16px rgba(0,0,0,0.07)' }}
            />
          </div>
          <CountdownContainer>
            <div className="countdown-item">
              <span className="number">{countdown.days}</span>
              <span className="text">Days</span>
            </div>
            <div className="countdown-item">
              <span className="number">{countdown.hours}</span>
              <span className="text">Hours</span>
            </div>
            <div className="countdown-item">
              <span className="number">{countdown.minutes}</span>
              <span className="text">Minutes</span>
            </div>
            <div className="countdown-item">
              <span className="number">{countdown.seconds}</span>
              <span className="text">Seconds</span>
            </div>
          </CountdownContainer>
        </Container>
      </StyledSection>
      
      <StyledSection className="bg-light">
        <Container>
          <h2>Our Wedding Journey</h2>
          <Row>
            <Col md={4}>
              <StyledCard className="text-center">
                <Card.Body>
                  <FaHeart className="card-icon" />
                  <Card.Title>Our Story</Card.Title>
                  <Card.Text>
                    Learn about how we met and our journey to this special day.
                  </Card.Text>
                </Card.Body>
              </StyledCard>
            </Col>
            <Col md={4}>
              <StyledCard className="text-center">
                <Card.Body>
                  <FaCalendarAlt className="card-icon" />
                  <Card.Title>Wedding Details</Card.Title>
                  <Card.Text>
                    Find all the information about our wedding day events.
                  </Card.Text>
                </Card.Body>
              </StyledCard>
            </Col>
            <Col md={4}>
              <StyledCard className="text-center">
                <Card.Body>
                  <FaMapMarkerAlt className="card-icon" />
                  <Card.Title>Travel & Accommodation</Card.Title>
                  <Card.Text>
                    Information on getting to our venue and where to stay.
                  </Card.Text>
                  <Link to="/travel-info">
                    <Button variant="outline-primary">Learn More</Button>
                  </Link>
                </Card.Body>
              </StyledCard>
            </Col>
          </Row>
        </Container>
      </StyledSection>
      
      <StyledSection>
        <Container className="text-center">
          <h2>Join Us in Celebrating</h2>
          <p className="lead mb-4">
            We can't wait to celebrate our special day with all our family and friends.
            Please let us know if you'll be joining us!
          </p>
        </Container>
      </StyledSection>
    </>
  );
};

export default Home;
