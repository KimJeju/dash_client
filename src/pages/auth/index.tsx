import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const Auth = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/auth/login');
  }),
    [];
  return <div />;
};
export default Auth;
