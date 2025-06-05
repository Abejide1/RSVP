import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Spinner, Alert, Button, Accordion } from 'react-bootstrap';
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
  const [search, setSearch] = useState('');

  // Filtered RSVPs by search
  const filteredRsvps = rsvps.filter(rsvp => {
    const name = (rsvp.fullName || rsvp.name || '').toLowerCase();
    const email = (rsvp.email || '').toLowerCase();
    return (
      name.includes(search.toLowerCase()) ||
      email.includes(search.toLowerCase())
    );
  });

  // Export CSV logic
  const handleExportCSV = () => {
    if (!rsvps.length) return;
    const header = [
      'Name', 'Email', 'Phone', 'Attending', 'Guests', 'Hotel', 'Stay', 'Shuttle', 'Travel Details', 'Buy Disposable Camera', 'Buy Spray Money', 'Spray Money Amount', 'Message', 'Submitted'
    ];
    const rows = rsvps.map(rsvp => [
      rsvp.fullName || rsvp.name || '',
      rsvp.email || '',
      rsvp.phoneNumber || '',
      rsvp.attending || '',
      rsvp.guestCount || '',
      rsvp.stayingAtHotel || '',
      rsvp.stayDuration || '',
      rsvp.needsShuttle || '',
      rsvp.travelDetails ? JSON.stringify(rsvp.travelDetails) : '',
      rsvp.buyDisposableCamera || '',
      rsvp.buySprayMoney || '',
      rsvp.sprayMoneyAmount || '',
      rsvp.message || '',
      rsvp.createdAt && rsvp.createdAt.toDate ? rsvp.createdAt.toDate().toLocaleString() : ''
    ]);
    const csvContent = [header, ...rows].map(row => row.map(field => `"${String(field).replace(/"/g, '""')}` ).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rsvp_data.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

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
              <h3>RSVP Submissions</h3>
              <div className="d-flex flex-wrap align-items-center justify-content-between mb-3">
                <input
                  type="text"
                  className="form-control me-2"
                  style={{ maxWidth: 260 }}
                  placeholder="Search by name or email..."
                  value={search || ''}
                  onChange={e => setSearch(e.target.value)}
                />
                <Button variant="outline-primary" onClick={handleExportCSV}>
                  Export CSV
                </Button>
              </div>
              {loading ? (
                <div className="text-center"><Spinner animation="border" /></div>
              ) : error ? (
                <Alert variant="danger">{error}</Alert>
              ) : (
                <div style={{ maxHeight: 600, overflowY: 'auto' }}>
                  <Accordion alwaysOpen>
                    {filteredRsvps
                      .slice()
                      .sort((a, b) => (a.fullName || a.name || '').localeCompare(b.fullName || b.name || ''))
                      .map((rsvp, idx) => (
                      <Accordion.Item eventKey={String(idx)} key={rsvp.id}>
                        <Accordion.Header>
                          {(rsvp.fullName || rsvp.name || 'No Name')}
                        </Accordion.Header>
                        <Accordion.Body>
                          <div><strong>Email:</strong> {rsvp.email}</div>
                          <div><strong>Phone:</strong> {rsvp.phoneNumber}</div>
                          <div><strong>Attending:</strong> {rsvp.attending}</div>
                          <div><strong>Guests:</strong> {rsvp.guestCount}</div>
                          <div><strong>Hotel:</strong> {rsvp.stayingAtHotel}</div>
                          <div><strong>Staying Duration:</strong> {rsvp.stayDuration}</div>
                          <div><strong>Shuttle:</strong> {rsvp.needsShuttle}</div>
                          <div><strong>Travel Details:</strong> {rsvp.travelDetails ? JSON.stringify(rsvp.travelDetails) : ''}</div>
                          <div><strong>Buy Disposable Camera:</strong> {rsvp.buyDisposableCamera}</div>
                          <div><strong>Buy Spray Money:</strong> {rsvp.buySprayMoney}</div>
                          {rsvp.buySprayMoney === 'yes' && (
                            <div><strong>Spray Money Amount:</strong> {rsvp.sprayMoneyAmount}</div>
                          )}
                          <div><strong>Message:</strong> {rsvp.message}</div>
                          <div><strong>Submitted:</strong> {rsvp.createdAt && rsvp.createdAt.toDate ? rsvp.createdAt.toDate().toLocaleString() : ''}</div>
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </div>
              )}
            </AdminCard>
          </Col>
        </Row>
      </Container>
    </StyledSection>
  );
};

export default Admin;
