import dayjs from 'dayjs';
import { useRouter } from 'next/router';

export function CheckJwtValid() {
  if (typeof window !== 'undefined') {
    // window 객체를 사용하는 코드
    let token = window.localStorage.getItem('access_token');

    if (token == null) {
      const router = useRouter();
      router.replace('/auth/login');
    }
  }
  return;
}

export function ObjectValueParser(data: object) {
  let total: any[] = [];

  let values: number[] = [];
  Object.values(data).forEach((value) => {
    values.push(value);
  });

  let label: string[] = [];
  Object.keys(data).forEach((value) => {
    if (typeof value === 'string') {
      label.push(value);
    }
  });
  total.push(values);
  total.push(label);

  return total;
}

export function AddDays(
  dayString: string,
  value: number,
  param: 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year',
) {
  let day = dayjs(dayString);
  let resultDay = day.add(value, param);
  return resultDay;
}
