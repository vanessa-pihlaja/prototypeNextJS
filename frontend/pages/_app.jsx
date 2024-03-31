import '../styles/global.css';
import { UserProvider } from '../contexts/UserContext';
import Head from 'next/head';
import Script from 'next/script';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Google tag (gtag.js) */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-DLHKESPVZT"></Script>
        <Script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-DLHKESPVZT', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Head>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </>
  );
}
