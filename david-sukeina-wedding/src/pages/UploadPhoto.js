import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, ProgressBar } from 'react-bootstrap';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import styled from 'styled-components';

const StyledSection = styled.section`
  padding: 4rem 0;
`;

const UploadCard = styled(Card)`
  border: none;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.07);
  padding: 2.5rem;
  margin-bottom: 2rem;
`;

const UploadPhoto = () => {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState([]);
  const [success, setSuccess] = useState([]);
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
    setSuccess([]);
    setError('');
    setProgress([]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!files.length) {
      setError('Please select at least one file.');
      return;
    }
    setIsUploading(true);
    setError('');
    setSuccess([]);
    setProgress(Array(files.length).fill(0));
    try {
      const storage = getStorage();
      const uploadPromises = files.map((file, idx) => {
        return new Promise((resolve, reject) => {
          const storageRef = ref(storage, `wedding-uploads/${Date.now()}_${file.name}`);
          const uploadTask = uploadBytesResumable(storageRef, file);
          uploadTask.on('state_changed',
            (snapshot) => {
              setProgress(prev => {
                const copy = [...prev];
                copy[idx] = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                return copy;
              });
            },
            () => {
              setError('Upload failed.');
              reject();
            },
            async () => {
              const url = await getDownloadURL(uploadTask.snapshot.ref);
              await addDoc(collection(db, 'wedding_photos'), {
                url,
                fileName: file.name,
                uploadedAt: serverTimestamp(),
              });
              resolve(file.name);
            }
          );
        });
      });
      const results = await Promise.all(uploadPromises);
      setSuccess(results);
      setFiles([]);
      setIsUploading(false);
    } catch (err) {
      setError('Upload failed.');
      setIsUploading(false);
    }
  };


  return (
    <StyledSection>
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <UploadCard>
              <h2>Upload a Photo</h2>
              <p>If you have any pictures of us together, or photos of us and you would like them to be in our wedding presentation, please upload them here.</p>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">Photo uploaded successfully!</Alert>}
              <Form onSubmit={handleUpload}>
                <Form.Group controlId="photoUpload" className="mb-3">
                  <Form.Label>Select Photos</Form.Label>
                  <Form.Control type="file" accept="image/*" multiple onChange={handleFileChange} disabled={isUploading} />
                </Form.Group>
                {progress.length > 0 && progress.map((prog, idx) => (
                  <ProgressBar key={idx} now={prog} label={`${prog}%`} className="mb-2" />
                ))}
                <Button type="submit" variant="primary" disabled={isUploading}>
                  {isUploading ? 'Uploading...' : 'Upload'}
                </Button>
                {success.length > 0 && (
                  <Alert variant="success" className="mt-3">
                    Uploaded: {success.join(', ')}
                  </Alert>
                )}
              </Form>
            </UploadCard>
          </Col>
        </Row>
      </Container>
    </StyledSection>
  );
};

export default UploadPhoto;
