import '../styles/global.css';
import { UserProvider } from '../contexts/UserContext';
import { Analytics } from "@vercel/analytics/react";

export default function MyApp({ Component, pageProps, Analytics }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}
