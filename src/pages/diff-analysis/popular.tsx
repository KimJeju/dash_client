import React, { useEffect, useState } from 'react';
import Layout from 'Layouts';
import styled from 'styled-components';
import Spinner from '@paljs/ui/Spinner';

import { Card, Col, Container, Row, Tab, Tabs } from '@paljs/ui';
import { GetRangePopularAllList, GetTotalFloatPopulation } from 'components/Utils/Apis';
import { TotalDataRender } from 'components/Share/render/TotalDataRender';
import { PopularDataLabel } from 'components/Constants/Labels';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ko';
import dayjs from 'dayjs';
import { CommonBarChart } from 'components/Share/charts/CommonBarChart';
import { PolarAreaChart } from 'components/Share/charts/PolarAreaChart';
import { labels, lastweek, now } from 'components/Constants/Common';
import { IPopularDataModel, IZoneChartModel } from 'components/Models/TotalDataModel';
import { CheckJwtValid } from 'components/Utils/Utils';

const StyledDiv = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  background-color: white;
`;

const SearchBtn = styled.button`
  width: 100px;
  height: 50px;
  background-color: #5983ff;
  transition: 0.5s;
  border: none;
  color: white;
  border-radius: 10px;
  margin-left: 1%;
  font-size: 1rem;
  font-weight: 600;
  &:hover {
    background-color: #396bff;
  }
`;

const Popular = () => {
  CheckJwtValid();

  const [totalData, setTotalData] = useState<IPopularDataModel>();
  const [chartData, setChartData] = useState<IZoneChartModel>();

  const [endDate, setEndDate] = useState(now); //마지막 날이 오늘
  const [startDate, setStartDate] = useState(lastweek); //시작일이 1주전;
  const [isLoading, setIsLoading] = useState(false);

  const onLoadPopularData = async () => {
    // 날짜검증
    if (dayjs(endDate).toDate() <= dayjs(startDate).toDate() || dayjs(endDate).toDate() > dayjs(now).toDate()) {
      setStartDate(lastweek);
      setEndDate(now);
      return alert('올바른 날짜 지정해주세요');
    }

    // 초기화
    setTotalData(undefined);
    setChartData(undefined);

    // 차트 데이터
    const response = await GetRangePopularAllList(startDate, endDate);
    const zoneChart: IZoneChartModel = {
      today: {},
      yesterday: {},
      month: {},
      residence: {},
      last_update: '',
    };

    Object.values(response).forEach((el) => {
      let obj = el as Record<string, object>;
      if (obj.today !== undefined) zoneChart.today = obj.today;
      if (obj.revisitor !== undefined) zoneChart.yesterday = obj.revisitor;
      if (obj.month !== undefined) zoneChart.month = obj.month;
      if (obj.residence !== undefined) zoneChart.residence = obj.residence;
    });
    setChartData(zoneChart);

    // 토탈데이터
    setTotalData(undefined);
    if (totalData == undefined && zoneChart == undefined) {
      setIsLoading(true);
    }
    setTotalData(await GetTotalFloatPopulation(startDate, endDate, '포항관광지 전체'));
    setIsLoading(false);
  };

  useEffect(() => {
    onLoadPopularData();
  }, []);

  return (
    <Layout title="유동인구분석">
      <Container>
        <Row>
          <Col breakPoint={{ xs: 12, lg: 6 }} style={{ marginBottom: '1%' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
              <span style={{ fontWeight: 600, marginLeft: '10px', fontSize: '1.2rem' }}>유동인구 분석기간</span>
              <StyledDiv>
                <DatePicker
                  label="시작일"
                  onChange={(item) => {
                    setStartDate(item?.format('YYYY-MM-DD') as string);
                  }}
                  value={dayjs(startDate)}
                />
                <span style={{ fontWeight: '700', marginLeft: '5px', marginRight: '5px', color: 'darkgray' }}>~</span>
                <DatePicker
                  label="종료일"
                  onChange={(item) => {
                    setEndDate(item?.format('YYYY-MM-DD') as string);
                  }}
                  value={dayjs(endDate)}
                />
                <SearchBtn onClick={onLoadPopularData} disabled={isLoading}>
                  SEARCH
                </SearchBtn>
              </StyledDiv>
            </LocalizationProvider>
          </Col>
          <Col breakPoint={{ xs: 12, lg: 12 }}>
            <TotalDataRender totalData={totalData as IPopularDataModel} label={PopularDataLabel} />
          </Col>
        </Row>
        <Row around="lg">
          <Col breakPoint={{ xs: 12, lg: 8 }}>
            {chartData === undefined ? (
              <Card>
                <Spinner>Loading..</Spinner>
              </Card>
            ) : (
              <Card>
                <Tabs>
                  <Tab title="방문객수">
                    <div style={{ height: '48vh' }}>
                      <CommonBarChart
                        zoneData={chartData?.today}
                        backgroundColor="rgba(255, 99, 132, 0.5)"
                        division="기간별 방문객수 "
                        labels={labels}
                      />
                    </div>
                  </Tab>
                  <Tab title="재방문자">
                    <div style={{ height: '48vh' }}>
                      <CommonBarChart
                        zoneData={chartData?.yesterday}
                        backgroundColor="#BFDBFE"
                        division="기간별 재방문자"
                        labels={labels}
                      />
                    </div>
                  </Tab>
                </Tabs>
              </Card>
            )}
          </Col>
          <Col breakPoint={{ xs: 12, lg: 4 }}>
            <Card>
              <header>평균 체류시간 ( 분 )</header>
              {chartData === undefined ? (
                <Card>
                  <Spinner>Loading..</Spinner>
                </Card>
              ) : (
                <div style={{ height: '50vh' }}>
                  <PolarAreaChart zoneData={chartData?.residence} labels={labels} />
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Popular;
