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
                  Our story began in London, England where we first met. It was truly love at first sight - a moment that would
                  change our lives forever. After our initial meeting, we went to get food together, spending hours talking
                  and laughing as if we'd known each other for years, not hours.
                </p>
                
                <h3 className="mb-4 mt-5">The Proposal</h3>
                <p>
                  On a beautiful day in Miami Beach, our journey toward marriage officially began. The proposal was small
                  and intimate, just the way we wanted it. With the sound of waves in the background and the sunset
                  painting the sky, we made the commitment to spend our lives together.
                </p>
                
                <h3 className="mb-4 mt-5">Our Journey Together</h3>
                <p>
                  We want to express our deepest gratitude to everyone who has supported our relationship and helped us
                  get to where we are today. From family members who cheered us on from the beginning, to friends who
                  stood by us through every up and down, your love and encouragement have meant the world to us.
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
