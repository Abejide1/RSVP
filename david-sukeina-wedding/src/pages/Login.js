import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
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

const LoginCard = styled(Card)`
  border: none;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.07);
  padding: 2.5rem;
`;

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      navigate('/admin');
    } catch (err) {
      setError('Invalid email or password.');
      setIsSubmitting(false);
    }
  };

  return (
    <StyledSection>
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <LoginCard>
              <h2>Login</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter admin email"
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
                    placeholder="Enter password"
                  />
                </Form.Group>
                <div className="text-center">
                  <Button variant="primary" type="submit" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? 'Logging in...' : 'Login'}
                  </Button>
                </div>
              </Form>
            </LoginCard>
          </Col>
        </Row>
      </Container>
    </StyledSection>
  );
};

export default Login;
