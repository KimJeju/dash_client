import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Layout from 'Layouts';
import dayjs from 'dayjs';
import { Col, Row, Spinner, Card } from '@paljs/ui';
import { VisitorTransitionRender } from 'components/Share/render/VisitorTransitionRender';
import {
  GetAreaSubtotalList,
  GetAreaTotalAvg,
  GetCurrentVisitPeople,
  GetRegionReVisitorTransition,
  GetRegionVisitorTransition,
} from 'components/Utils/Apis';
import { PieChart } from 'components/Share/charts/PieChart';
import { TotalAreaRender } from 'components/Share/render/TotalAreaRender';
import { SubZonesAreaRender } from 'components/Share/render/SubZonesAreaRender';
import { BogyeongTmp, Homigot, Ligari, Nampo, Regions, Songdo, Yeongil } from 'components/Constants/Common';
import { SubTotalAreaRender } from 'components/Share/render/SubTotalAreaRender';
import { IAreaTotalAvgModel, IRegionTransitionModel, TZoneValue } from 'components/Models/AreaInfoModel';
import NaverMap from 'components/Share/NaverMap';
import { CheckJwtValid, ObjectValueParser } from 'components/Utils/Utils';

const shadow = 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px';

const Span = styled.span`
  margin-bottom: 10px;
  font-size: 1rem;
  font-weight: 600;
`;

const Button = styled.button`
  background: rgb(117, 166, 252, 0.99);
  border: none;
  width: 100px;
  height: 20%;
  border-radius: 7px;
  color: white;
  &:hover {
    transition: 0.5s;
    box-shadow: 3px 3px 10px #666;
    background: rgba(51, 100, 206, 0.8);
  }
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: 0.5s;
`;

const SubTitle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  font-weight: bold;
  font-size: 0.6em;
`;

const StyleCol = styled(Col)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyleRow = styled(Col)`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const StyleCard = styled(Card)`
  background: rgb(104, 215, 192);
  background: linear-gradient(
    164deg,
    rgba(104, 215, 192, 1) 0%,
    rgba(109, 205, 218, 1) 49%,
    rgba(115, 194, 244, 1) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-weight: 600;
  height: 10vh;
  span {
    font-size: 0.8em;
    letter-spacing: -1px;
    font-weight: 600;
  }
`;

const Home = () => {
  CheckJwtValid();

  const [currentPeople, setCurrentPeople] = useState<IRegionTransitionModel>();
  const [visitor, setVisitor] = useState<IRegionTransitionModel>();
  const [revisitor, setReVisitor] = useState<IRegionTransitionModel>();
  const [totalAvg, setTotalAvg] = useState<IAreaTotalAvgModel>();
  const [subTotal, setSubTotal] = useState<TZoneValue>();

  const [label, setLabel] = useState<string[]>([]);

  const [zoneLabel, setZoneLabel] = useState('영일대');
  const [lat, setLat] = useState(36.0574065020324);
  const [lon, setLon] = useState(129.37638212320465);
  const [zoom, setZoom] = useState(14);
  const [labels, setLabels] = useState(Yeongil);

  const zoneInfo: { [key: string]: { lat: number; lon: number; zoom: number; labels: string[] } } = {
    영일대: { lat: 36.0574065020324, lon: 129.37638212320465, zoom: 15, labels: Yeongil },
    송도: { lat: 36.03885900158593, lon: 129.3799359254328, zoom: 15, labels: Songdo },
    이가리: { lat: 36.17618594631182, lon: 129.390000642294, zoom: 14, labels: Ligari },
    보경사: { lat: 36.24961176673499, lon: 129.3194578510704, zoom: 17, labels: BogyeongTmp },
    호미곶: { lat: 36.07716572541909, lon: 129.56756701726246, zoom: 17, labels: Homigot },
    남포: { lat: 35.9656658754064, lon: 129.42908838827276, zoom: 17, labels: Nampo },
  };

  const onLoadTotalTransition = async () => {
    //토탈 값은 버튼에 변화하지 않기 위해 따로뺌
    let totalAvgResult = (await GetAreaTotalAvg()) as IAreaTotalAvgModel;
    setTotalAvg(totalAvgResult);
  };

  const onLoadTransition = async (param: string[]) => {
    //초기화
    setVisitor(undefined);
    setReVisitor(undefined);
    setCurrentPeople(undefined);
    setSubTotal(undefined);

    let currentVisitor = (await GetCurrentVisitPeople(param)) as IRegionTransitionModel;
    let visitResult = (await GetRegionVisitorTransition(param)) as IRegionTransitionModel;
    let revisitResult = (await GetRegionReVisitorTransition(param)) as IRegionTransitionModel;
    let subTotalResult = (await GetAreaSubtotalList(param)) as TZoneValue;

    // 라벨 전처리
    let labelArr: string[] = [];
    let dataSet = ObjectValueParser(visitResult.data);
    dataSet[1].forEach((element: string) => {
      let formatDay = dayjs(element).format('YYYY-MM-DD');
      labelArr.push(formatDay);
    });

    setLabel(labelArr);
    setVisitor(visitResult);
    setReVisitor(revisitResult);
    setCurrentPeople(currentVisitor);
    setSubTotal(subTotalResult);
  };

  const handleChangeChartData = (event: EventTarget & HTMLButtonElement) => {
    const selectZone = event.value;

    if (zoneInfo[selectZone]) {
      setZoneLabel(selectZone);
      setLat(zoneInfo[selectZone].lat);
      setLon(zoneInfo[selectZone].lon);
      setZoom(zoneInfo[selectZone].zoom);
      setLabels(zoneInfo[selectZone].labels);
    }
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
            style={{ marginLeft: '1%', marginTop: '1%', fontSize: '0.8em' }}
          >
            <span>{el}</span>
          </Button>,
        );
      } else {
        result.push(
          <Button
            onClick={(e) => handleChangeChartData(e.currentTarget)}
            value={el}
            key={key}
            style={{ marginTop: '1%', fontSize: '0.8em' }}
          >
            <span>{el}</span>
          </Button>,
        );
      }
    });
    return result;
  };

  useEffect(() => {
    onLoadTotalTransition();
    onLoadTransition(labels);
  }, [labels]);

  return (
    <Layout title="홈">
      <div>
        <Row>
          <Col breakPoint={{ xs: 9.5 }} style={{ height: '87vh', boxShadow: shadow }}>
            <Row around="xs">
              <StyleCol breakPoint={{ xs: 4 }}>
                <Contents style={{ width: '100%' }}>
                  <Span>포항시 전체 방문객 </Span>
                  <StyleCard style={{ justifyContent: 'center', alignItems: 'center' }}>
                    {totalAvg === undefined ? <Spinner>Loading...</Spinner> : <TotalAreaRender data={totalAvg} />}
                  </StyleCard>
                </Contents>
              </StyleCol>
              <StyleRow breakPoint={{ xs: 8 }} style={{ display: 'flex' }}>
                <Contents style={{ width: '40%' }}>
                  <Span>{zoneLabel} 권역 방문객</Span>
                  <StyleCard>
                    {subTotal === undefined ? <Spinner>Loading...</Spinner> : SubTotalAreaRender(subTotal)}
                  </StyleCard>
                </Contents>
                <Contents style={{ width: '43%' }}>
                  <SubTitle>
                    <div style={{ width: '50%', textAlign: 'center', padding: '1%' }}>개소명</div>
                    <div style={{ width: '15%', textAlign: 'center', padding: '1%' }}>금일방문</div>
                    <div style={{ width: '15%', textAlign: 'center', padding: '1%' }}>재방문</div>
                    <div style={{ width: '15%', textAlign: 'center', padding: '1%' }}>체류시간</div>
                  </SubTitle>
                  <div>{subTotal === undefined ? <></> : SubZonesAreaRender(subTotal, labels)}</div>
                </Contents>
              </StyleRow>
            </Row>

            <Row>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '1em',
                  width: '50%',
                  height: '10%',
                  paddingLeft: '1%',
                }}
              >
                {btnRender()}
              </div>
              <Col breakPoint={{ xs: 12 }} style={{ height: '64vh', overflow: 'hidden' }}>
                <div
                  style={{
                    width: '100%',
                    overflow: 'hidden',
                    boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
                  }}
                >
                  <NaverMap lat={lat} lon={lon} zoom={zoom} />
                </div>
              </Col>
            </Row>
          </Col>
          <Col
            breakPoint={{ xs: 2.3 }}
            style={{ marginLeft: '5px', height: '87vh', padding: '2px', boxShadow: shadow }}
          >
            {visitor === undefined || revisitor === undefined || currentPeople === undefined ? (
              <Spinner>Loading...</Spinner>
            ) : (
              <div style={{ height: '60vh' }}>
                <VisitorTransitionRender
                  data={visitor.data}
                  label={label}
                  division="권역별 방문객 추이"
                  background="rgba(99, 148, 255, 0.5)"
                />
                <br />
                <VisitorTransitionRender
                  data={revisitor.data}
                  label={label}
                  division="권역별 재방문객 추이"
                  // background="rgba(85, 97, 116, 0.322)"
                  background="rgba(255, 99, 132, 0.5)"
                />
                <br />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <PieChart zoneData={currentPeople.data} title="실시간 체류 인원" />
                </div>
              </div>
            )}
          </Col>
        </Row>
      </div>
    </Layout>
  );
};
export default Home;
