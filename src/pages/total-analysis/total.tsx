// import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Layout from 'Layouts';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import { Button, Card, CardBody, Container, Spinner } from '@paljs/ui';
import { TotalDataRender } from 'components/Share/render/TotalDataRender';
import { GetCurrentAvgTotalValue, GetZoneAvgChartValue } from 'components/Utils/Apis';
import {
  BogyeongTmp,
  Homigot,
  Ligari,
  Nampo,
  now,
  Regions,
  Songdo,
  Yeongil,
  yesterday,
} from 'components/Constants/Common';
import { TotalDataLabel } from 'components/Constants/Labels';
import { CommonBarChart } from 'components/Share/charts/CommonBarChart';
import { ITotalDataModel, IZoneChartModel } from 'components/Models/TotalDataModel';
import { AddDays, CheckJwtValid } from 'components/Utils/Utils';

const style = {
  boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
  marginLeft: '1px',
  marginBottom: '5px',
  borderRadius: '5px',
  paddingTop: '1vh',
  marginTop: '1vh',
  width: '40%',
};

const Total = () => {
  CheckJwtValid();

  const [totalData, setTotalData] = useState<ITotalDataModel>();
  const [zoneChart, setZoneChart] = useState<IZoneChartModel>();
  const [zoneLabel, setZoneLabel] = useState('영일대');
  const [labels, setLabels] = useState(Yeongil);

  const onLoadChangeZoneChart = async (param: string[]) => {
    setZoneChart(undefined);
    setTotalData(await GetCurrentAvgTotalValue(yesterday, now, '포항관광지 전체'));
    const response = await GetZoneAvgChartValue(param);
    const zoneChart: IZoneChartModel = {
      today: {},
      yesterday: {},
      month: {},
      residence: {},
      last_update: '',
    };
    Object.values(response).forEach((el) => {
      let obj = el as Record<string, object | string>;
      if (obj.today !== undefined) zoneChart.today = obj.today;
      if (obj.yesterday !== undefined) zoneChart.yesterday = obj.yesterday;
      if (obj.month !== undefined) zoneChart.month = obj.month;
      if (obj.residence !== undefined) zoneChart.residence = obj.residence;
      if (obj.last_update !== undefined)
        zoneChart.last_update = AddDays(obj.last_update as string, 9, 'hour').format('YYYY-MM-DD HH:MM');
    });
    setZoneChart(zoneChart);
  };

  const handleChangeChartData = (event: EventTarget & HTMLButtonElement) => {
    switch (event.value) {
      case '영일대':
        setLabels([...Yeongil]);
        setZoneLabel(event.value);
        break;
      case '송도':
        setLabels([...Songdo]);
        setZoneLabel(event.value);
        break;
      case '이가리':
        setLabels([...Ligari]);
        setZoneLabel(event.value);
        break;
      case '보경사':
        setLabels([...BogyeongTmp]);
        setZoneLabel(event.value);
        break;
      case '호미곶':
        setLabels([...Homigot]);
        setZoneLabel(event.value);
        break;
      case '남포':
        setLabels([...Nampo]);
        setZoneLabel(event.value);
        break;
    }
    onLoadChangeZoneChart(labels);
  };

  const btnRender = () => {
    const result: any = [];
    //맨 좌측에 버튼엔 margin 안주기
    Regions.map((el, key) => {
      if (key !== 0) {
        result.push(
          <Button
            onClick={(e) => handleChangeChartData(e.currentTarget)}
            key={key}
            value={el}
            style={{ marginLeft: '1%', marginTop: '1%' }}
          >
            {el}
          </Button>,
        );
      } else {
        result.push(
          <Button
            onClick={(e) => handleChangeChartData(e.currentTarget)}
            value={el}
            key={key}
            style={{ marginTop: '1%' }}
          >
            {el}
          </Button>,
        );
      }
    });
    return result;
  };
  useEffect(() => {
    //초기값
    onLoadChangeZoneChart(['영일대해수욕장/해상누각', '스페이스워크(환호공원)', '해상스카이워크']);
  }, []);

  return (
    <Layout title="통합분석">
      <Container>
        <Row>
          <Col breakPoint={{ xs: 12, lg: 12 }}>
            <TotalDataRender totalData={totalData as ITotalDataModel} label={TotalDataLabel} />
          </Col>
        </Row>
        <Row>
          <Col breakPoint={{ xs: 12, lg: 12 }}>
            <Card>
              <header style={{ fontSize: '1.2rem', display: 'flex', flexDirection: 'column' }}>
                {zoneLabel} 지역 별 통계차트
                {zoneChart == undefined ? (
                  <></>
                ) : (
                  <p style={{ fontSize: '0.8rem' }}>
                    ( 기준 : {AddDays(zoneChart.last_update, 0, 'hour').format('YYYY-MM-DD HH:MM')})
                  </p>
                )}
                <div>{btnRender()}</div>
              </header>

              <CardBody>
                {zoneChart == undefined ? (
                  <Spinner>Loading..</Spinner>
                ) : (
                  <div>
                    <Row around="lg">
                      <Card style={style}>
                        <header style={{ fontSize: '1.2rem' }}>현재 방문객 (명)</header>
                        <CardBody>
                          <Col breakPoint={{ xs: 12, lg: 16 }}>
                            <CommonBarChart
                              zoneData={zoneChart.today}
                              backgroundColor="rgba(255, 99, 132, 0.5)"
                              division="현재 방문객 (명)"
                              labels={labels}
                            />
                          </Col>
                        </CardBody>
                      </Card>
                      <Card style={style}>
                        <header style={{ fontSize: '1.2rem' }}>전일 방문객 (명)</header>
                        <CardBody>
                          <Col breakPoint={{ xs: 12, lg: 16 }}>
                            <CommonBarChart
                              zoneData={zoneChart.yesterday}
                              backgroundColor="rgba(99, 148, 255, 0.5)"
                              division="전일 방문객 (명)"
                              labels={labels}
                            />
                          </Col>
                        </CardBody>
                      </Card>
                      <Card style={style}>
                        <header style={{ fontSize: '1.2rem' }}>금월 방문객 (명)</header>
                        <CardBody>
                          <Col breakPoint={{ xs: 12, lg: 12 }}>
                            <CommonBarChart
                              zoneData={zoneChart.month}
                              backgroundColor="rgba(99, 255, 159, 0.5)"
                              division="금월 방문객 (명)"
                              labels={labels}
                            />
                          </Col>
                        </CardBody>
                      </Card>
                      <Card style={style}>
                        <header style={{ fontSize: '1.2rem' }}>평균 체류시간 (분)</header>
                        <CardBody>
                          <Col breakPoint={{ xs: 16, lg: 12 }}>
                            <CommonBarChart
                              zoneData={zoneChart.residence}
                              backgroundColor="rgba(250, 91, 29, 0.5)"
                              division="평균 체류시간 (분)"
                              labels={labels}
                            />
                          </Col>
                        </CardBody>
                      </Card>
                    </Row>
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Total;
