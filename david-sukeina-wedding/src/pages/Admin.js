import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Spinner, Alert } from 'react-bootstrap';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import styled from 'styled-components';

const StyledSection = styled.section`
  padding: 4rem 0;
  
  h2 {
    text-align: center;
    margin-bottom: 2rem;
  }
`;

const AdminCard = styled(Card)`
  border: none;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

const Admin = () => {
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [photoCount, setPhotoCount] = useState(0);

  useEffect(() => {
    const fetchRsvps = async () => {
      setLoading(true);
      setError('');
      try {
        const q = query(collection(db, 'rsvps'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRsvps(data);
      } catch (err) {
        setError('Failed to fetch RSVPs.');
      } finally {
        setLoading(false);
      }
    };
    fetchRsvps();

    // Fetch photo count
    const fetchPhotoCount = async () => {
      try {
        const photoSnapshot = await getDocs(collection(db, 'wedding_photos'));
        setPhotoCount(photoSnapshot.size);
      } catch {}
    };
    fetchPhotoCount();
  }, []);

  return (
    <StyledSection>
      <Container>
        <h2>RSVP Tracker (Admin)</h2>
        <div style={{ marginBottom: '1rem', fontWeight: 500, color: 'var(--primary-color)' }}>
          Uploaded Wedding Photos: {photoCount}
        </div>
        <Row className="justify-content-center">
          <Col lg={12}>
            <AdminCard>
              {loading && <div className="text-center"><Spinner animation="border" /></div>}
              {error && <Alert variant="danger">{error}</Alert>}
              {!loading && !error && (
                <Table responsive bordered hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Attending</th>
                      <th>Guests</th>
                      <th>Dietary</th>
                      <th>Hotel</th>
                      <th>Shuttle</th>
                      <th>Stay</th>
                      <th>Flight</th>
                      <th>Arrival</th>
                      <th>Departure</th>
                      <th>Message</th>
                      <th>Submitted</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rsvps.map((rsvp) => (
                      <tr key={rsvp.id}>
                        <td>{rsvp.fullName}</td>
                        <td>{rsvp.email}</td>
                        <td>{rsvp.phoneNumber}</td>
                        <td>{rsvp.attending}</td>
                        <td>{rsvp.guestCount}</td>
                        <td>{rsvp.dietaryRestrictions}</td>
                        <td>{rsvp.stayingAtHotel}</td>
                        <td>{rsvp.needsShuttle}</td>
                        <td>{rsvp.stayDuration}</td>
                        <td>{rsvp.travelDetails?.flightNumber}</td>
                        <td>{rsvp.travelDetails?.arrivalDate} {rsvp.travelDetails?.arrivalTime}</td>
                        <td>{rsvp.travelDetails?.departureDate} {rsvp.travelDetails?.departureTime}</td>
                        <td>{rsvp.message}</td>
                        <td>{rsvp.createdAt && rsvp.createdAt.toDate ? rsvp.createdAt.toDate().toLocaleString() : ''}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </AdminCard>
          </Col>
        </Row>
      </Container>
    </StyledSection>
  );
};

export default Admin;
