import { Card } from '@paljs/ui';
import { IDiffZoneModel } from 'components/Models/DiffDataModel';

export function DiffZoneDataRender(diffZone: IDiffZoneModel) {
  return (
    <Card style={{ display: 'flex', flexDirection: 'column', justifyItems: 'left', padding: '1%' }}>
      <header style={{ fontSize: '1.2rem' }}>{diffZone.zone}</header>
      <div style={{ padding: '1%', backgroundColor: ' red' }}>
        <span>오늘의 방문자 : {diffZone.today}</span>
      </div>
      <div style={{ padding: '1%', backgroundColor: ' red' }}>
        <span>이달의 방문자 : {diffZone.month}</span>
      </div>
      <div style={{ padding: '1%', backgroundColor: ' red' }}>
        <span>금년 누적 방문자 : {diffZone.month}</span>
      </div>
      <div style={{ padding: '1%', backgroundColor: ' red' }}>
        <span>체류 인원 : {diffZone.nowPeople}</span>
      </div>
      <div style={{ padding: '1%', backgroundColor: ' red' }}>
        <span>체류 시간 : {diffZone.residence} 분</span>
      </div>
      <div style={{ padding: '1%', backgroundColor: ' red' }}>
        <span>재방문자 : {diffZone.yesterday} </span>
      </div>
    </Card>
  );
}
