// pages/_app.js
import '../styles/global.css'; // Adjust the path based on your project structure

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
