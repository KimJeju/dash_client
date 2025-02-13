import { CommonBarChart } from '../charts/CommonBarChart';

export function VisitorTransitionRender({
  data,
  division,
  label,
  background,
}: {
  data: any;
  division: string;
  label: string[];
  background: string;
}) {
  return (
    <div style={{ padding: '1%', height: '20vh' }}>
      <CommonBarChart zoneData={data} division={division} backgroundColor={background} labels={label} />
    </div>
  );
}
