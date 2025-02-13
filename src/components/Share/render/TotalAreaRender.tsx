import React from 'react';
import styled from 'styled-components';
import { Col } from '@paljs/ui';
import { IAreaTotalAvgModel, IZoneValueModel } from 'components/Models/AreaInfoModel';

const ChildrenCol = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-right: 1px solid black;
  align-items: center;
  font-size: 0.7vw;
`;

// const StyleCard = styled(Card)`
//   display: flex;
//   width: 100%;
//   font-weight: 600;
//   margin-top: 10px;

//   span {
//     letter-spacing: -1px;
//     font-weight: 600;
//   }
// `;
export function TotalAreaRender({ data }: { data: IAreaTotalAvgModel | IZoneValueModel }) {
  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', margin: 'auto', width: '100%' }}>
        <ChildrenCol>
          <span>현재 방문객</span>
          {data.nowPeople} 명
        </ChildrenCol>
        <ChildrenCol>
          <span>오늘 방문객</span>
          {data.today} 명
        </ChildrenCol>
        <ChildrenCol style={{ border: 'none' }}>
          <span>이달의 방문객</span>
          {data.month} 명
        </ChildrenCol>
      </div>
    </div>
  );
}
