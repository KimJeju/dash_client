import dayjs from 'dayjs';

export const now = dayjs().format('YYYY-MM-DD');
export const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
export const lastweek = dayjs().subtract(1, 'week').format('YYYY-MM-DD');

//권역
export const Regions: string[] = ['영일대', '송도', '이가리', '보경사', '호미곶', '남포'];
//존
export const labels: string[] = [
  '일본인가옥거리',
  '보경사',
  '사방기념공원',
  '송도송림테마거리',
  '송도해수욕장',
  '스페이스워크',
  '연오랑세오녀',
  '영일대해수욕장',
  '오어사',
  '이가리 닻 전망대',
  '일월문화공원',
  '장기유배문화체험촌',
  '해상스카이워크',
  '호미곶 해맞이광장',
];

export const Yeongil: string[] = ['영일대해수욕장/해상누각', '스페이스워크(환호공원)', '해상스카이워크'];
export const Songdo: string[] = ['송도해수욕장', '송도송림테마거리(솔밭도시숲)'];
export const Ligari: string[] = ['이가리 닻 전망대', '사방기념공원'];
export const BogyeongTmp: string[] = ['내연산/보경사'];
export const Homigot: string[] = ['연오랑세오녀 테마공원(귀비고)', '호미곶 해맞이광장', '구룡포 일본인가옥거리'];
export const Nampo: string[] = ['오어사', '일월문화공원', '장기유배문화체험촌'];
