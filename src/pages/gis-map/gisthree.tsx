import React from 'react';
import Layout from 'Layouts';
import { Col, Row } from '@paljs/ui';
import { CheckJwtValid } from 'components/Utils/Utils';

const GisThree = () => {
  CheckJwtValid();

  const shadow = 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px';
  const radius = '3px';
  return (
    <Layout title="3DGIS">
      <div>
        <Row style={{ height: 'calc(100vh - 150px)' }}>
          <Col breakPoint={{ xs: 14, lg: 12 }}>
            <div style={{ width: '100%', height: '100%' }}>
              <iframe
                src="../../map.html"
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

export default GisThree;
