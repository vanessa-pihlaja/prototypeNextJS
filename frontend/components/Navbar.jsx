import Link from 'next/link';
import styles from '../styles/navbar.module.css'

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.ulList}>
        <li className={styles.liItem}>
        <Link href="/">Fiidi</Link>
        </li>
        <li className={styles.liItem}>
        <Link href="/search">Haku</Link>
        </li>
        <li className={styles.liItem}>
        <Link href="/profile">Profiili</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
