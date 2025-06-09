import React from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import { FaClock } from 'react-icons/fa';
import styled from 'styled-components';

const StyledSection = styled.section`
  padding: 4rem 0;
  
  h2 {
    text-align: center;
    margin-bottom: 2rem;
  }
`;

const ContentCard = styled(Card)`
  border: none;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  padding: 2rem;
`;

const TimelineItem = styled.div`
  display: flex;
  margin-bottom: 2rem;
  align-items: flex-start;
  
  .time {
    min-width: 100px;
    font-weight: bold;
    color: var(--primary-color);
  }
  
  .details {
    flex-grow: 1;
    
    h5 {
      margin-bottom: 0.5rem;
      color: var(--primary-color);
    }
    
    p {
      margin-bottom: 0.25rem;
      line-height: 1.4;
    }
  }
  
  .icon {
    margin-right: 1rem;
    font-size: 1.5rem;
    color: var(--primary-color);
  }
`;

function WeddingDetails() {
  return (
    <StyledSection>
      <Container>
        <h2>Wedding Day Schedule</h2>
        <Row className="justify-content-center">
          <Col lg={8}>
            <ContentCard>
              <Card.Body>
                <h3 className="mb-4 text-center">Thursday, July 30, 2026</h3>
                
                <div className="text-center py-5">
                  <h4 style={{ color: 'var(--primary-color)' }}>Wedding Day Schedule</h4>
                  <p className="lead my-4">TBA</p>
                  <p>Detailed schedule will be provided closer to the wedding date.</p>
                </div>
                
                <div className="mt-5 mb-3">
                  <h4>Dress Code</h4>
                  <p>Formal Attire / Black Tie Optional</p>
                </div>
                
                <div className="mb-3">
                  <h4>Weather</h4>
                  <p>July in Tangier is typically warm. The ceremony and reception will be held both indoors and outdoors, so please dress accordingly.</p>
                </div>
              </Card.Body>
            </ContentCard>
          </Col>
        </Row>
      </Container>
    </StyledSection>
  );
}

export default WeddingDetails;
