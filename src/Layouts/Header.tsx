import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled, { DefaultTheme } from 'styled-components';
import Select from '@paljs/ui/Select';
import { LayoutHeader } from '@paljs/ui/Layout';
import { EvaIcon } from '@paljs/ui/Icon';
import { Actions } from '@paljs/ui/Actions';
import ContextMenu from '@paljs/ui/ContextMenu';
import User from '@paljs/ui/User';
import { breakpointDown } from '@paljs/ui/breakpoints';
import Spinner from '@paljs/ui/Spinner';

const HeaderStyle = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  ${breakpointDown('sm')`
    .right{
      display: none;
    }
  `}
  .right > div {
    height: auto;
    display: flex;
    align-content: center;
  }
  .logo {
    font-size: 1.25rem;
    white-space: nowrap;
    text-decoration: none;
  }
  .left {
    display: flex;
    align-items: center;
    .github {
      font-size: 18px;
      margin-right: 5px;
    }
  }
`;

const Label = styled.span`
  display: flex;
  align-items: center;
`;

const SelectStyled = styled(Select)`
  min-width: 150px;
`;

interface HeaderProps {
  toggleSidebar: () => void;
  theme: {
    set: (value: DefaultTheme['name']) => void;
    value: DefaultTheme['name'];
  };
  changeDir: () => void;
  dir: 'rtl' | 'ltr';
}

const Header: React.FC<HeaderProps> = (props) => {
  const router = useRouter();
  const [user, setUser] = useState('');
  const [account, setAccount] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUser(window.sessionStorage.getItem('user') as string);
      setAccount(window.sessionStorage.getItem('account') as string);
    }
  }, []);

  const themeOptions = () => [
    {
      value: 'default',
      label: (
        <Label>
          <EvaIcon name="droplet" options={{ fill: '#a6c1ff' }} />
          Default
        </Label>
      ),
    },
    {
      value: 'dark',
      label: (
        <Label>
          <EvaIcon name="droplet" options={{ fill: '#192038' }} />
          Dark
        </Label>
      ),
    },
    // {
    //   value: 'cosmic',
    //   label: (
    //     <Label>
    //       <EvaIcon name="droplet" options={{ fill: '#5a37b8' }} />
    //       Cosmic
    //     </Label>
    //   ),
    // },
    // {
    //   value: 'corporate',
    //   label: (
    //     <Label>
    //       <EvaIcon name="droplet" options={{ fill: '#3366ff' }} />
    //       Corporate
    //     </Label>
    //   ),
    //   selected: true,
    // },
  ];
  return (
    <LayoutHeader fixed>
      <HeaderStyle>
        <Actions
          size="Medium"
          actions={[
            {
              icon: { name: 'menu-2-outline' },
              url: {
                onClick: props.toggleSidebar,
              },
            },
            {
              content: (
                <Link href="/">
                  <a className="logo">Gasi Dash</a>
                </Link>
              ),
            },
            {
              content: (
                <SelectStyled
                  instanceId="react-select-input"
                  isSearchable={false}
                  shape="SemiRound"
                  placeholder="Themes"
                  value={themeOptions().find((item) => item.value === props.theme.value)}
                  options={themeOptions()}
                  onChange={({ value }: { value: DefaultTheme['name'] }) => props.theme.set(value)}
                />
              ),
            },
            // { 사이드바 좌,우 반전 버튼
            //   content: (
            //     <Button size="Small" onClick={() => props.changeDir()}>
            //       {props.dir}
            //     </Button>
            //   ),
            // },
          ]}
        />
        <Actions
          size="Small"
          className="right"
          actions={[
            {
              content: (
                <ContextMenu
                  nextJs
                  style={{ cursor: 'pointer' }}
                  placement="bottom"
                  currentPath={router.pathname}
                  items={[{ title: 'Log out', link: { href: '/auth/login' } }]}
                  Link={Link}
                >
                  {user === '' && account === '' ? (
                    <Spinner size="Tiny">Loading...</Spinner>
                  ) : (
                    <User name={user} title={account} size="Medium" />
                  )}
                </ContextMenu>
              ),
            },
          ]}
        />
      </HeaderStyle>
    </LayoutHeader>
  );
};
export default Header;
