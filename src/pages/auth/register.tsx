import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
//import { Checkbox } from '@paljs/ui/Checkbox';
import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { useRouter } from 'next/router';

import Auth from 'components/Auth';
import Layout from 'Layouts';
//import Socials from 'components/Auth/Socials';

import Swal from 'sweetalert2';
import { signUpRequest } from 'components/Utils/Apis';

const Input = styled(InputGroup)`
  margin-bottom: 2rem;
`;

export default function Register() {
  const [userId, setUserId] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailRegularError, setEmailRegularError] = useState(false);
  const [nameRegularError, setNameRegularError] = useState(false);
  const [pwdRegularError, setPwdRegularError] = useState(false);
  const [confirmPwdRegularError, setConfirmPwdRegularError] = useState(false);
  const [emailErrState, setEmailErrState] = useState('none');
  const [nameErrState, setNameErrState] = useState('none');
  const [pwdErrState, setPwdErrState] = useState('none');
  const [confirmPwdErrState, setConfirmPwdErrState] = useState('none');
  const [emailErrMsg, setEmailErrMsg] = useState('');
  const [nameErrMsg, setNameErrMsg] = useState('');
  const [confirmPwdErrMsg, setConfirmPwdErrMsg] = useState('');
  const [pwdErrMsg, setPwdErrMsg] = useState('');

  const router = useRouter();

  const onClickRegister = async () => {
    // 비밀번호, 이메일 형식 통과시
    if (emailRegularError === true) {
      Swal.fire({
        icon: 'error',
        title: 'Email Error',
        text: '이메일 형식을 확인해주세요.',
      });
      setUserId('');
      return;
    }
    if (nameRegularError === true) {
      Swal.fire({
        icon: 'error',
        title: 'Name Error',
        text: '이름 형식을 확인해주세요.',
      });
      setUsername('');
      return;
    }
    if (pwdRegularError === true) {
      Swal.fire({
        icon: 'error',
        title: 'Password Error',
        text: '비밀번호 형식을 확인해주세요.',
      });
      setPassword('');
      setConfirmPassword('');
      return;
    }
    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Password Check Error.',
        text: '비밀번호가 일치하지 않습니다.',
      });
      setPassword('');
      setConfirmPassword('');
      return;
    }
    const response = (await signUpRequest(userId, username, password)) as any;
    // 회원가입 실패
    if (response.detail !== undefined) {
      Swal.fire({
        icon: 'error',
        title: '이미 가입된 이메일입니다.',
        text: '다른 이메일을 사용해주세요.',
      });
      return;
    }
    // 회원가입 성공
    Swal.fire({
      icon: 'success',
      title: '회원가입 요청 완료',
      text: '관리자 승인 후 로그인이 가능합니다.',
    });

    router.replace('/auth/login');
  };

  // 이메일
  const onChangeUserId = (event: EventTarget & HTMLInputElement) => {
    const userIdValue = event.value;
    // 이메일 정규식
    const emailRegular = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegular.test(userIdValue)) {
      setEmailRegularError(true);
      setEmailErrState('block'); //이메일 에러 메시지 출력
      setEmailErrMsg('이메일 형식이 올바르지 않습니다.'); //이메일 에러 메시지
    } else {
      setEmailRegularError(false);
      setEmailErrState('none'); //이메일 에러 메시지 숨김
      setEmailErrMsg(''); //이메일 에러 메시지 초기화
    }
    setUserId(event.value);
  };

  // 이름
  const onChangeUsername = (event: EventTarget & HTMLInputElement) => {
    const usernameValue = event.value;
    const usernameRegular = /^[A-Za-z0-9가-힣]+$/; //영문, 한글, 숫자만 입력 가능
    if (!usernameRegular.test(usernameValue)) {
      setNameRegularError(true);
      setNameErrState('block'); //이름 에러 메시지 출력
      setNameErrMsg('이름의 형식이 올바르지 않습니다.'); //이름 에러 메시지
    } else {
      setNameRegularError(false);
      setNameErrState('none'); //이름 에러 메시지 숨김
      setNameErrMsg(''); //이름 에러 메시지 초기화
    }
    setUsername(event.value);
  };

  // 비밀번호
  const onChangePassword = (event: EventTarget & HTMLInputElement) => {
    const passwordValue = event.value;
    const passwordRegular = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    if (!passwordRegular.test(passwordValue)) {
      setPwdRegularError(true);
      setPwdErrState('block'); //비밀번호 에러 메시지 출력
      setPwdErrMsg('비밀번호 형식이 올바르지 않습니다.'); //비밀번호 에러 메시지
    } else {
      setPwdRegularError(false);
      setPwdErrState('none'); //비밀번호 에러 메시지 숨김
      setPwdErrMsg(''); //비밀번호 에러 메시지 초기화
    }
    setPassword(event.value);
  };

  // 비밀번호 확인
  const onChangeConfirmPassword = (event: EventTarget & HTMLInputElement) => {
    const confirmPasswordValue = event.value;
    const passwordRegular = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    if (!passwordRegular.test(confirmPasswordValue) || password !== confirmPasswordValue) {
      setConfirmPwdRegularError(true);
      setConfirmPwdErrState('block'); //비밀번호 확인 에러 메시지 출력
      setConfirmPwdErrMsg('비밀번호가 맞지 않습니다.'); //비밀번호 확인 에러 메시지
    } else {
      setConfirmPwdRegularError(false);
      setConfirmPwdErrState('none'); //비밀번호 확인 에러 메시지 숨김
      setConfirmPwdErrMsg(''); //비밀번호 확인 에러 메시지 초기화
    }
    setConfirmPassword(event.value);
  };

  return (
    <Layout title="Register">
      <Auth title="회원가입">
        <form>
          <div>
            <Input fullWidth>
              <input
                type="email"
                value={userId}
                placeholder="이메일 ( 이메일 형식에 맞게 입력해주세요. )"
                onChange={(e) => onChangeUserId(e.currentTarget)}
                style={{ borderColor: emailRegularError === true ? 'red' : 'blue' }}
                autoComplete="off"
              />
            </Input>
            <span style={{ marginTop: '-30px', marginBottom: '-30px,', color: 'red', display: emailErrState }}>
              {emailErrMsg}
            </span>
          </div>
          <div>
            <Input fullWidth>
              <input
                type="name"
                value={username}
                placeholder="이름 ( 특수문자를 제외한 영문, 한글, 숫자만 입력 가능 )"
                onChange={(e) => onChangeUsername(e.currentTarget)}
                style={{ borderColor: 'blue' }}
                autoComplete="off"
              />
            </Input>
            <span style={{ marginTop: '-30px', marginBottom: '-30px,', color: 'red', display: nameErrState }}>
              {nameErrMsg}
            </span>
          </div>

          <div>
            <Input fullWidth>
              <input
                type="password"
                value={password}
                placeholder="비밀번호 ( 영문, 숫자, 특수문자 포함 8자 이상 )"
                onChange={(e) => onChangePassword(e.currentTarget)}
                style={{ borderColor: pwdRegularError === true ? 'red' : 'blue' }}
                autoComplete="off"
              />
            </Input>
            <span style={{ marginTop: '-30px', marginBottom: '-30px,', color: 'red', display: pwdErrState }}>
              {pwdErrMsg}
            </span>
          </div>
          <div>
            <Input fullWidth>
              <input
                type="password"
                value={confirmPassword}
                placeholder="비밀번호 확인 ( 영문, 숫자, 특수문자 포함 8자 이상 )"
                onChange={(e) => onChangeConfirmPassword(e.currentTarget)}
                style={{ borderColor: confirmPwdRegularError === true ? 'red' : 'blue' }}
                autoComplete="off"
              />
            </Input>
            <span style={{ marginTop: '-30px', marginBottom: '-30px,', color: 'red', display: confirmPwdErrState }}>
              {confirmPwdErrMsg}
            </span>
          </div>
          <Button status="Success" type="button" shape="SemiRound" fullWidth onClick={onClickRegister}>
            가입요청
          </Button>
          <button
            type="button"
            onClick={() =>
              alert(
                `이메일: ${userId}\n이름: ${username}\n비밀번호: ${password}\n이메일 형식 오류: ${emailRegularError}\n비밀번호 형식 오류: ${pwdRegularError}\n비밀번호 확인 형식 오류: ${confirmPwdRegularError}`,
              )
            }
          >
            확인
          </button>
        </form>
        <p>
          로그인{' '}
          <Link href="/auth/login">
            <a>Click</a>
          </Link>
        </p>
      </Auth>
    </Layout>
  );
}
