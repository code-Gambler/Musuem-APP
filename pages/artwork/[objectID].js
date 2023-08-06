import React from 'react';
import { useRouter } from 'next/router';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ArtworkCardDetail from '@/components/ArtworkCardDetail';

export default function ArtworkById() {
  const router = useRouter();
  const { objectID } = router.query;

  return (
    <Row>
      <Col className="d-flex justify-content-center">
        <ArtworkCardDetail objectID={objectID} />
      </Col>
    </Row>
  );
}