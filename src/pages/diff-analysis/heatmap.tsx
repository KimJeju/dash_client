import React from 'react';
import { Container, Row } from '@paljs/ui';
import Layout from 'Layouts';
import { CheckJwtValid } from 'components/Utils/Utils';

const HeatMap = () => {
  CheckJwtValid();

  const shadow = 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px';
  const radius = '3px';
  return (
    <Layout title="히트맵">
      <Container>
        <Row style={{ height: 'calc(100vh - 150px)', boxShadow: shadow }}>
          <div style={{ width: '100%', height: '100%', overflowY: 'hidden' }}>
            <iframe
              src="../../heatmap.html"
              width="100%"
              height="100%"
              style={{ border: 'none', boxShadow: shadow, borderRadius: radius }}
            />
          </div>
        </Row>
      </Container>
    </Layout>
  );
};

export default HeatMap;
