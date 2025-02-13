import { Card, CardBody, Col, Row, Spinner } from '@paljs/ui';
import { IPopularDataModel, ITotalDataModel } from 'components/Models/TotalDataModel';
import { AddDays } from 'components/Utils/Utils';

const style = {
  boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
  marginLeft: '1px',
  marginBottom: '5px',
  borderRadius: '5px',
  paddingTop: '1vh',
  paddingBottom: '5vh',
  alignItems: 'center',
};

export function TotalDataRender({
  totalData,
  label,
}: {
  totalData: ITotalDataModel | IPopularDataModel;
  label: string[];
}) {
  const rendering = () => {
    let result: any = [];
    if (totalData !== undefined) {
      Object.values(totalData).map((value, index) => {
        if (label.length <= index) {
          return;
        } else {
          result.push(
            <Col key={index} style={style} breakPoint={{ xs: 12, lg: 1.5 }}>
              <span style={{ letterSpacing: '-1px', color: 'grey' }}>{label[index]}</span>
              <div style={{ fontSize: '1.5rem', fontWeight: 600, paddingTop: '1vh' }}>
                {value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
              </div>
            </Col>,
          );
        }
      });
      return result;
    }
  };

  return (
    <Card>
      <header style={{ fontSize: '1.2rem' }}>
        포항 관광지 전체 통계
        <span style={{ fontSize: '0.8rem', fontWeight: '400' }}>
          {totalData == undefined ? (
            <></>
          ) : (
            <span>( 기준 : {AddDays(totalData.last_update, 9, 'hour').format('YYYY-MM-DD HH:MM')})</span>
          )}
        </span>
      </header>
      <CardBody>
        {totalData == undefined ? <Spinner>Loading..</Spinner> : <Row around="lg">{rendering()}</Row>}
      </CardBody>
    </Card>
  );
}
