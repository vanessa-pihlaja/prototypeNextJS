import '../styles/global.css';
import { UserProvider } from '../contexts/UserContext';

export default function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}
