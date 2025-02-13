import styled from 'styled-components';
import { IZoneValueModel, TZoneValue } from 'components/Models/AreaInfoModel';

const Container = styled.div`
  background: rgb(104, 215, 192);
  background: linear-gradient(
    164deg,
    rgba(104, 215, 192, 1) 0%,
    rgba(109, 205, 218, 1) 49%,
    rgba(115, 194, 244, 1) 100%
  );

  overflow: hidden;

  margin-top: 2vh;
  width: 100%;
  font-size: 0.9vw;
  padding: 3%;
  font-weight: 600;
  height: 1vh;
  border-radius: 2px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;

  span {
    letter-spacing: -1px;
    font-weight: 600;
  }

  div {
    padding-right: 2%;
    border-right: 1px black grey;
    align-items: center;
    font-size: 0.58em;
    font-weight: bold;
  }
`;

export const SubZonesAreaRender = (data: TZoneValue, labels: string[]) => {
  const renderArr: any = [];
  Object.values(data as TZoneValue).map((el, idx) => {
    const zone = el as IZoneValueModel;
    if (zone[labels[idx]] !== undefined) {
      renderArr.push(
        <div style={{ width: '18vw', marginTop: '4%' }}>
          <Container style={{ marginTop: '-3px' }}>
            <div style={{ textAlign: 'center', width: '50%' }}>
              {/* <EvaIcon status="Success" name="heart-outline" /> */}
              {[labels[idx]]}
            </div>
            <div style={{ textAlign: 'center' }}>{zone[labels[idx]].today} 명</div>
            <div style={{ textAlign: 'center' }}>{zone[labels[idx]].revisitor} 명</div>
            <div style={{ border: 'none' }}>{zone[labels[idx]].residence} 분</div>
          </Container>
        </div>,
      );
    }
  });
  return renderArr;
};
