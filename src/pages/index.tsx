import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Index() {
  const router = useRouter();
  if (typeof window !== 'undefined') {
    // window 객체를 사용하는 코드
    const token = window.sessionStorage.getItem('access_token');
    if (token == null) {
      router.replace('/auth/login');
    } else {
      useEffect(() => {
        router.push('/dashboard');
      }, []);
    }
  }
  return <div />;
}
