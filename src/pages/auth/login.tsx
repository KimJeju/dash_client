import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Auth from 'components/Auth';
import Layout from 'Layouts';
import { LoginRequest } from 'components/Utils/Apis';
import { ILoginFailModel, ILoginResponseModel } from 'components/Models/AuthModel';

export default function Login() {
  const router = useRouter();
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userPlaceholder, setUserPlaceholder] = useState<string>('이메일과 비밀번호를 입력해주세요');

  const onClickLogin = async () => {
    const regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    if (!regEmail.test(userId)) {
      setUserId('');
      setUserPlaceholder('올바른 이메일을 입력해주세요');
      return;
    }

    const response = (await LoginRequest(userId, password)) as any;

    if (response.status_code == undefined) {
      let loginSuccess = response as ILoginResponseModel;

      if (typeof window !== 'undefined') {
        // window 객체를 사용하는 코드
        window.sessionStorage.setItem('access_token', loginSuccess.token_type + ' ' + loginSuccess.access_token);
        window.sessionStorage.setItem('user', loginSuccess.user);

        switch (loginSuccess.authority) {
          case 1:
            window.sessionStorage.setItem('account', '사용자');
            break;
          case 2:
            window.sessionStorage.setItem('account', '관리자');
            break;
          default:
            router.replace('/auth/login');
            alert('승인되지 않은 사용자');
            break;
        }
        router.replace('/dashboard');
      }
    } else {
      // 로그인 실패 시
      let loginFail = response as ILoginFailModel;
      setUserId('');
      setUserPlaceholder(loginFail.detail);
      return;
    }
  };

  const onChageUserId = (event: EventTarget & HTMLInputElement) => {
    setUserId(event.value);
  };

  const onChagePassword = (event: EventTarget & HTMLInputElement) => {
    setPassword(event.value);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 로그아웃 버튼을 눌렀을 때에 토큰 날려주기
      if (window.sessionStorage.getItem('access_token')) {
        window.sessionStorage.removeItem('access_token');
      }
    }
  }, []);

  return (
    <Layout title="Login">
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '23%', height: ' 50px' }}>
          <Auth title="로그인" subTitle={userPlaceholder}>
            <form>
              <InputGroup fullWidth>
                <input
                  type="email"
                  value={userId}
                  placeholder="이메일"
                  onChange={(e) => onChageUserId(e.currentTarget)}
                  autoComplete="off" // email 입력 시 자동완성 기능 비활성화
                />
              </InputGroup>
              <InputGroup fullWidth>
                <input
                  type="password"
                  placeholder="비밀번호"
                  onChange={(e) => onChagePassword(e.currentTarget)}
                  autoComplete="off" // password 입력 시 자동완성 기능 비활성화
                  required
                />
              </InputGroup>
              <Button status="Success" type="button" shape="SemiRound" onClick={onClickLogin} fullWidth>
                로그인
              </Button>
            </form>
            <p>
              회원가입{' '}
              <Link href="/auth/register">
                <a>Click</a>
              </Link>
            </p>
          </Auth>
        </div>
      </div>
    </Layout>
  );
}
