// import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Layout from 'Layouts';
import { Card, CardBody, Col, Container, Row, Spinner } from '@paljs/ui';
import { TotalDataRender } from 'components/Share/render/TotalDataRender';
import { GetCurrentAvgTotalValue, GetDiffAvgZoneValue } from 'components/Utils/Apis';
import { TotalDataLabel } from 'components/Constants/Labels';
import { now, yesterday } from 'components/Constants/Common';
import { IDiffZoneModel } from 'components/Models/DiffDataModel';
import { ITotalDataModel } from 'components/Models/TotalDataModel';
import { AddDays, CheckJwtValid } from 'components/Utils/Utils';
import styled from 'styled-components';

const DivStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 11em;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
`;

const DiffTotal = () => {
  CheckJwtValid();

  const [diffZone, setDiffZone] = useState<IDiffZoneModel[]>([]);
  const [totalData, setTotalData] = useState<ITotalDataModel>();
  const [lastUpdate, setLastUpdate] = useState<string>('');

  const onLoadDiffZone = async () => {
    setTotalData(await GetCurrentAvgTotalValue(yesterday, now, '포항관광지 전체'));
    const objList: IDiffZoneModel[] = [];
    const response = await GetDiffAvgZoneValue(now);
    Object.values(response).map((el) => {
      let obj = el as Record<string, IDiffZoneModel>;
      if (obj.data !== undefined) {
        objList.push(obj.data);
      }
    });
    setLastUpdate(AddDays(response[14].last_update, 9, 'hour').format('YYYY-MM-DD HH:MM'));
    setDiffZone([...objList]);
  };

  const diffZoneRendering = () => {
    let result: any = [];

    const fontStyle = {
      fontSize: '1.1rem',
      fontWeight: '600',
    };

    if (diffZone.length !== 0) {
      Object.values(diffZone).map((el, key) => {
        result.push(
          <Card
            style={{
              display: 'flex',
              flexDirection: 'column',
              paddingLeft: '1%',
              width: '22em',
            }}
            key={key}
          >
            <header style={{ fontSize: '1.2em', textAlign: 'center' }}>{el.zone} </header>
            <Row>
              <DivStyle>
                <span>오늘의 방문자</span>
                <span style={fontStyle}>{el.today} 명</span>
              </DivStyle>
              <DivStyle>
                <span>이달의 방문자</span>
                <span style={fontStyle}> {el.month} 명</span>
              </DivStyle>
              <DivStyle>
                <span>금년 누적 방문자 </span> <span style={fontStyle}>{el.month} 명</span>
              </DivStyle>
              <DivStyle>
                <span>체류 인원 </span> <span style={fontStyle}>{el.nowPeople} 명</span>
              </DivStyle>
              <DivStyle>
                <span>체류 시간 </span>
                <span style={fontStyle}>{el.residence} 분</span>
              </DivStyle>
              <DivStyle>
                <span>재방문자 </span> <span style={fontStyle}> {el.yesterday}명</span>
              </DivStyle>
            </Row>
          </Card>,
        );
      });
    }
    return result;
  };

  useEffect(() => {
    onLoadDiffZone();
  }, []);

  return (
    <Layout title="비교통합분석">
      <Container>
        <Row>
          <Col breakPoint={{ xs: 12, lg: 12 }}>
            <TotalDataRender totalData={totalData as ITotalDataModel} label={TotalDataLabel} />
          </Col>
        </Row>
        <Row>
          <Col breakPoint={{ xs: 12, lg: 12 }}>
            <Card>
              <header style={{ fontSize: '1.2rem' }}>
                지역 별 통합 통계{' '}
                <span style={{ fontSize: '0.8rem', fontWeight: '400' }}>( 기준 : {lastUpdate} ) </span>
              </header>
              <CardBody>
                {diffZone.length == 0 ? <Spinner>Loading..</Spinner> : <Row between="lg">{diffZoneRendering()}</Row>}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default DiffTotal;
