import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledSection = styled.section`
  padding: 4rem 0;
  
  h2 {
    text-align: center;
    margin-bottom: 2rem;
  }
`;

const FormCard = styled(Card)`
  border: none;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

const RSVP = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    attending: 'yes',
    guestCount: 1,
    plusOneCode: '',
    stayingAtHotel: 'yes',
    travelDetails: {
      flightNumber: '',
      arrivalDate: '',
      arrivalTime: '',
      departureDate: '',
      departureTime: '',
    },
    stayDuration: '1-3',
    message: '',
    needsShuttle: 'yes',
    buyDisposableCamera: 'no',
    buySprayMoney: 'no',
    sprayMoneyAmount: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess(false);
    try {
      const dataToSubmit = {
        ...formData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      // Save data to Firestore
      await addDoc(collection(db, 'rsvps'), dataToSubmit);
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => navigate('/thank-you'), 1500);
    } catch (err) {
      console.error('Error saving RSVP:', err);
      setError('There was an error submitting your RSVP. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <StyledSection>
      <Container>
        <h2>RSVP for Our Wedding</h2>
        <p className="text-center mb-5">
          Please let us know if you'll be joining us in celebrating our special day.
          We need to receive your RSVP by September 1, 2025.
        </p>
        
        <Row className="justify-content-center">
          <Col lg={8}>
            <FormCard>
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3" controlId="fullName">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        placeholder="Enter your full name"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="email">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="phoneNumber">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control 
                        type="tel" 
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                        placeholder="Enter your phone number"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="attending">
                      <Form.Label>Will you be attending?</Form.Label>
                      <Form.Select 
                        name="attending"
                        value={formData.attending}
                        onChange={handleChange}
                        required
                      >
                        <option value="yes">Yes, I will attend</option>
                        <option value="no">No, I cannot attend</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="plusOneCode">
                      <Form.Label>Have a code for a plus one?</Form.Label>
                      <Form.Control
                        type="text"
                        name="plusOneCode"
                        value={formData.plusOneCode}
                        onChange={handleChange}
                        placeholder="Enter code to allow a plus 1"
                        autoComplete="off"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="guestCount">
                      <Form.Label>Number of Guests (including yourself)</Form.Label>
                      <Form.Control
                        type="number"
                        name="guestCount"
                        value={formData.guestCount}
                        onChange={handleChange}
                        min="1"
                        max="5"
                        required
                        disabled={formData.plusOneCode !== 'PLUS1CODE' || formData.attending === 'no'}
                        style={{ backgroundColor: formData.plusOneCode !== 'PLUS1CODE' ? '#eee' : 'white', color: '#888' }}
                        placeholder={formData.plusOneCode !== 'PLUS1CODE' ? 'Enter code to allow a plus 1' : 'Enter number of guests'}
                      />
                      {formData.plusOneCode !== 'PLUS1CODE' && (
                        <small className="text-muted">Enter code to allow a plus 1</small>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                
                {formData.attending === 'yes' && (
                  <>
                    <hr className="my-4" />
                    <h4>Travel & Accommodation Details</h4>
                    <p className="text-muted mb-4">
                      Please provide your travel details to help us coordinate airport shuttles 
                      and accommodation.
                    </p>
                    
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="stayingAtHotel">
                          <Form.Label>Will you be staying at a hotel?</Form.Label>
                          <Form.Select 
                            name="stayingAtHotel"
                            value={formData.stayingAtHotel}
                            onChange={handleChange}
                          >
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="stayDuration">
                          <Form.Label>How long will you be staying?</Form.Label>
                          <Form.Select 
                            name="stayDuration"
                            value={formData.stayDuration}
                            onChange={handleChange}
                          >
                            <option value="1-3">1-3 days</option>
                            <option value="4-7">4-7 days</option>
                            <option value="over-week">Over a week</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Form.Group className="mb-3" controlId="needsShuttle">
                      <Form.Label>Do you need airport shuttle service?</Form.Label>
                      <Form.Select 
                        name="needsShuttle"
                        value={formData.needsShuttle}
                        onChange={handleChange}
                      >
                        <option value="yes">Yes, please</option>
                        <option value="no">No, I'll arrange my own transportation</option>
                      </Form.Select>
                    </Form.Group>
                    
                    <h5 className="mt-3">Flight Information</h5>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="flightNumber">
                          <Form.Label>Flight Number (if known)</Form.Label>
                          <Form.Control 
                            type="text" 
                            name="travelDetails.flightNumber"
                            value={formData.travelDetails.flightNumber}
                            onChange={handleChange}
                            placeholder="e.g., AA123"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="arrivalDate">
                          <Form.Label>Arrival Date</Form.Label>
                          <Form.Control 
                            type="date" 
                            name="travelDetails.arrivalDate"
                            value={formData.travelDetails.arrivalDate}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="arrivalTime">
                          <Form.Label>Arrival Time (approx.)</Form.Label>
                          <Form.Control 
                            type="time" 
                            name="travelDetails.arrivalTime"
                            value={formData.travelDetails.arrivalTime}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="departureDate">
                          <Form.Label>Departure Date</Form.Label>
                          <Form.Control 
                            type="date" 
                            name="travelDetails.departureDate"
                            value={formData.travelDetails.departureDate}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="departureTime">
                          <Form.Label>Departure Time (approx.)</Form.Label>
                          <Form.Control 
                            type="time" 
                            name="travelDetails.departureTime"
                            value={formData.travelDetails.departureTime}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </>
                )}
                
                <Form.Group className="mb-3" controlId="buyDisposableCamera">
                  <Form.Label>Do you want to buy a disposable camera?</Form.Label>
                  <Form.Select 
                    name="buyDisposableCamera"
                    value={formData.buyDisposableCamera}
                    onChange={handleChange}
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="buySprayMoney">
                  <Form.Label>Do you want to buy spray money?</Form.Label>
                  <Form.Select 
                    name="buySprayMoney"
                    value={formData.buySprayMoney}
                    onChange={handleChange}
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </Form.Select>
                </Form.Group>

                {formData.buySprayMoney === 'yes' && (
                  <Form.Group className="mb-3" controlId="sprayMoneyAmount">
                    <Form.Label>If yes, how much?</Form.Label>
                    <Form.Control 
                      type="number"
                      name="sprayMoneyAmount"
                      value={formData.sprayMoneyAmount}
                      onChange={handleChange}
                      placeholder="Enter amount (e.g., 50)"
                      min="1"
                    />
                  </Form.Group>
                )}

                <Form.Group className="mb-3" controlId="message">
                  <Form.Label>Additional Message (Optional)</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={3}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Any additional information you'd like to share with us"
                  />
                </Form.Group>
                
                <div className="text-center">
                  <Button 
                    variant="primary" 
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
                  </Button>
                  {success && (
                    <Alert variant="success" className="mt-3">
                      RSVP submitted successfully!
                    </Alert>
                  )}
                </div>
              </Form>
            </FormCard>
          </Col>
        </Row>
      </Container>
    </StyledSection>
  );
};

export default RSVP;
