import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledSection = styled.section`
  padding: 5rem 0;
  h2 {
    text-align: center;
    margin-bottom: 2rem;
    color: var(--primary-color);
  }
`;

const CreateCard = styled(Card)`
  border: none;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.07);
  padding: 2.5rem;
`;

const CreateAccount = () => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess(false);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;
      // Save name and phone to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name: form.name,
        phone: form.phone,
        email: form.email,
        createdAt: new Date()
      });
      setSuccess(true);
      setIsSubmitting(false);
      navigate('/');
    } catch (err) {
      setError('Could not create account: ' + err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <StyledSection>
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <CreateCard>
              <h2>Create an Account</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">Account created! Redirecting...</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="phone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="Enter your phone number"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                  />
                </Form.Group>
                <Form.Group className="mb-4" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    placeholder="Create a password"
                  />
                </Form.Group>
                <div className="text-center">
                  <Button variant="primary" type="submit" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? 'Creating...' : 'Create Account'}
                  </Button>
                </div>
              </Form>
            </CreateCard>
          </Col>
        </Row>
      </Container>
    </StyledSection>
  );
};

export default CreateAccount;

