import React from 'react';
import Head from 'next/head';

const NEXT_PUBLIC_NAVER_API_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_API_CLIENT_ID;
const NAVER_API = 'https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=' + NEXT_PUBLIC_NAVER_API_CLIENT_ID;

const SEO: React.FC<SEOProps> = ({ description, keywords, title }) => (
  <Head>
    <title>{title} | Gasi Dash Board</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords?.join(', ')} />
    <meta property="og:type" content="website" />
    <meta name="og:title" property="og:title" content={title} />
    <meta name="og:description" property="og:description" content={description} />
    <meta property="og:site_name" content="" />
    <meta property="og:url" content="" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:site" content="" />
    <meta name="twitter:creator" content="@AhmedElywh" />
    <meta name="twitter:image" content="" />
    <meta property="og:image" content="" />
    <link rel="icon" type="image/png" href="/icons/gasi_ci.png" />
    <link rel="apple-touch-icon" type="image/png" href="/icons/icon-72x72.png" />
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-171177495-4"></script>
    <script src={NAVER_API} type="text/javascript"></script>
    <script
      dangerouslySetInnerHTML={{
        __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'UA-171177495-4');
              `,
      }}
    />
  </Head>
);

export interface SEOProps {
  description?: string;
  lang?: string;
  meta?: any[];
  keywords?: string[];
  title: string;
}

SEO.defaultProps = {
  description: 'Gasi',
  keywords: [
    'admin-dashboard',
    'admin',
    'react',
    'reactjs',
    'dashboard',
    'dashboard-templates',
    'themes',
    'styled-components',
    'styledcomponents',
    'admin-template',
    'free-admin-template',
    'react-admin-dashboard',
    'react-admin-panel',
    'react-admin-component',
    'nextjs',
    'react-forms',
    'react-select',
    'react-accordion',
    'react-chat',
    'react-admin-template',
  ],
};

export default SEO;
