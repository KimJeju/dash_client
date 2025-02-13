import { IZoneValueModel, TZoneValue } from 'components/Models/AreaInfoModel';
import { TotalAreaRender } from './TotalAreaRender';

export const SubTotalAreaRender = (data: TZoneValue) => {
  const renderArr: any = [];
  Object.values(data as TZoneValue).forEach((el) => {
    const zone = el as IZoneValueModel;
    if (zone['권역별 방문객'] !== undefined) {
      renderArr.push(
        <div style={{ width: '100%', height: '7vh', display: 'flex', alignItems: 'center' }}>
          <TotalAreaRender data={zone['권역별 방문객']} />
        </div>,
      );
    }
  });
  return renderArr;
};
