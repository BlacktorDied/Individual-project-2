import styles from './Header.module.scss';
import Link from "next/link";

export default function Header() {
    return (
        <header className={styles.main}>
            <a href="/"><img className={styles.main__logo} src="/img/logo.png" alt="SCP Foundation logo"/></a>
            <nav className={styles.main__nav}>
                <ul className={styles.main__wrapper}>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/scps">SCPs</Link></li>
                    <li><Link href="/staff">Staff</Link></li>
                    <li><Link href="/facility">Facilities</Link></li>
                </ul>
            </nav>
        </header>
    )
}
