// pages/_app.js
import '../styles/global.css'; // Adjust the path based on your project structure
import { UserProvider } from '../contexts/UserContext';

export default function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}
