import { Card, CardBody, Col, Row, Spinner } from '@paljs/ui';
import { now, yesterday } from 'components/Constants/Common';
import { TotalDataLabel } from 'components/Constants/Labels';
import { ITotalDataModel } from 'components/Models/TotalDataModel';
import { GetTotalFloatPopulation } from 'components/Utils/Apis';
import { useState, useEffect } from 'react';

const style = {
  boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
  height: 'calc(100vh - 800px)',
  marginLeft: '1px',
  marginBottom: '5px',
  borderRadius: '5px',
  paddingTop: '1vh',
  alignItems: 'center',
};

export function PopularRender() {
  const [popularionData, setPopularionData] = useState<ITotalDataModel>();

  const rendering = () => {
    let result: any = [];
    if (popularionData !== undefined) {
      Object.values(popularionData).map((value, index) => {
        if (index == 6) {
          return;
        } else {
          result.push(
            <Col key={index} style={style} breakPoint={{ xs: 12, lg: 1.5 }}>
              <span style={{ letterSpacing: '-1px', color: 'grey' }}>{TotalDataLabel[index]}</span>
              <div style={{ fontSize: '1.5rem', fontWeight: 600, paddingTop: '1vh' }}>
                {value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')} 명
              </div>
            </Col>,
          );
        }
      });
      return result;
    }
  };

  useEffect(() => {
    async function onLoadAsyncData() {
      setPopularionData(await GetTotalFloatPopulation(yesterday, now, '포항관광지 전체'));
    }
    onLoadAsyncData();
  }, []);

  return (
    <Card>
      <header style={{ fontSize: '1.2rem' }}>포항 관광지 전체 통계</header>
      <CardBody>
        {popularionData == undefined ? <Spinner>Loading..</Spinner> : <Row around="lg">{rendering()}</Row>}
      </CardBody>
    </Card>
  );
}
