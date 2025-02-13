import React from 'react';
import Layout from 'Layouts';
import { Col, Row } from '@paljs/ui';
import { CheckJwtValid } from 'components/Utils/Utils';

CheckJwtValid();

const gisVite = () => {
  const shadow = 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px';
  const radius = '3px';
  return (
    <Layout title="VITEGIS">
      <div>
        <Row style={{ height: 'calc(100vh - 250px)' }}>
          <Col breakPoint={{ xs: 12, lg: 12 }} style={{ padding: '1%' }}>
            <div style={{ width: '100%', height: '100%' }}>
              <iframe
                src="http://127.0.0.1:5173/index.html"
                width="100%"
                height="100%"
                style={{ border: 'none', boxShadow: shadow, borderRadius: radius }}
              />
            </div>
          </Col>
        </Row>
      </div>
    </Layout>
  );
};
export default gisVite;
