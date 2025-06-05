import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import styled from 'styled-components';
import { FaPlaneArrival, FaHotel, FaCarSide } from 'react-icons/fa';

const StyledSection = styled.section`
  padding: 4rem 0;
  
  h2 {
    text-align: center;
    margin-bottom: 2rem;
  }
`;

const InfoCard = styled(Card)`
  border: none;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }

  .card-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: var(--primary-color);
  }
`;

const TravelInfo = () => {
  return (
    <StyledSection>
      <Container>
        <h2>Travel & Accommodation Information</h2>
        <Row className="justify-content-center mb-5">
          <Col md={8} className="text-center">
            <p>
              We are thrilled to welcome you to Tangier, Morocco for our wedding celebration! Here is some important information to help you plan your trip.
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <InfoCard className="text-center">
              <Card.Body>
                <FaPlaneArrival className="card-icon" />
                <Card.Title>Arriving in Tangier</Card.Title>
                <Card.Text>
                  The nearest airport is Tangier Ibn Battuta Airport (TNG). Please provide your flight details in the RSVP form so we can help coordinate shuttle transportation.
                </Card.Text>
              </Card.Body>
            </InfoCard>
          </Col>
          <Col md={4}>
            <InfoCard className="text-center">
              <Card.Body>
                <FaHotel className="card-icon" />
                <Card.Title>Hotel Accommodation</Card.Title>
                <Card.Text>
                  We have reserved blocks at several hotels in Tangier. Please indicate in your RSVP if you will need a hotel, and we will send you a list of recommended accommodations.
                </Card.Text>
              </Card.Body>
            </InfoCard>
          </Col>
          <Col md={4}>
            <InfoCard className="text-center">
              <Card.Body>
                <FaCarSide className="card-icon" />
                <Card.Title>Shuttle & Transportation</Card.Title>
                <Card.Text>
                  Shuttle service will be provided from the airport to the hotels and wedding venue. Please let us know your travel plans so we can coordinate your pickup.
                </Card.Text>
              </Card.Body>
            </InfoCard>
          </Col>
        </Row>
        <Row className="justify-content-center mt-5">
          <Col md={8} className="text-center">
            <h4>Questions?</h4>
            <p>
              If you have any questions or need assistance with your travel arrangements, please contact us at <a href="mailto:davidabejide96@gmail.com">davidabejide96@gmail.com</a>.
            </p>
          </Col>
        </Row>
      </Container>
    </StyledSection>
  );
};

export default TravelInfo;
