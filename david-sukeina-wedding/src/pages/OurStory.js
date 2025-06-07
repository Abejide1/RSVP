import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
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

function OurStory() {
  return (
    <StyledSection>
      <Container>
        <h2>Our Story</h2>
        <Row className="justify-content-center">
          <Col lg={8}>
            <ContentCard>
              <Card.Body>
                <h3 className="mb-4">How We Met</h3>
                <p>
                  This is where you'll share the story of how you met. You can include details about your first meeting,
                  how your relationship developed, and what made you fall in love.
                </p>
                
                <h3 className="mb-4 mt-5">The Proposal</h3>
                <p>
                  Share the details of the proposal here. Where did it happen? Was it a surprise? What made the moment special?
                </p>
                
                <h3 className="mb-4 mt-5">Our Journey Together</h3>
                <p>
                  This section can include highlights from your relationship - travels you've taken together, milestones you've
                  achieved, or challenges you've overcome as a couple.
                </p>
                
                <div className="text-center mt-5">
                  <p className="lead">
                    We're excited to celebrate our love with you on July 30, 2026!
                  </p>
                </div>
              </Card.Body>
            </ContentCard>
          </Col>
        </Row>
      </Container>
    </StyledSection>
  );
}

export default OurStory;
