import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';

const StyledNavbar = styled(Navbar)`
  background-color: var(--primary-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
  
  .navbar-brand {
    font-size: 1.8rem;
    font-weight: 600;
    color: var(--light-text);
  }
  
  .nav-link {
    color: var(--light-text);
    font-weight: 500;
    margin: 0 1rem;
    position: relative;
    transition: all 0.3s ease;
  }
  
  .nav-link:hover {
    color: var(--secondary-color);
  }
  
  .nav-link::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    background-color: var(--secondary-color);
    bottom: -5px;
    left: 0;
    transition: width 0.3s ease;
  }
  
  .nav-link:hover::after {
    width: 100%;
  }
`;

const Navigation = ({ user }) => {
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const fetchName = async () => {
      if (user) {
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const name = docSnap.data().name || "";
            setDisplayName(name.split(" ")[0]);
          } else {
            setDisplayName("");
          }
        } catch {
          setDisplayName("");
        }
      } else {
        setDisplayName("");
      }
    };
    fetchName();
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <StyledNavbar expand="lg" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">David & Sukeina</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            {user && (
              <>
                <Nav.Link as={Link} to="/rsvp">RSVP</Nav.Link>
                <Nav.Link as={Link} to="/travel-info">Travel Info</Nav.Link>
              </>
            )}
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/create-account">Create Account</Nav.Link>
              </>
            )}
            {user && (
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            )}
            {user && displayName && (
              <span style={{ color: '#F3E9DC', marginLeft: 20, fontWeight: 500, fontSize: '1rem' }}>
                WELCOME {displayName.toUpperCase()}
              </span>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </StyledNavbar>
  );
};

export default Navigation;
