import Image from "next/image";
import profile from "../../public/profile.png";
import logo from "../../public/Logo.png";
import Link from "next/link";
import styles from "./NavBar.module.css";

function NavBar() {
  return (
    <div className={styles.navBar}>
      <div className={styles.logo}>
        <Link href="/">
          <Image src={logo} alt="Torino Logo" width={146} height={44} />
        </Link>
      </div>
      <div className={styles.menu}>
        <ul>
          <li>
            <Link href="/">صفحه اصلی</Link>
          </li>
          <li>
            <Link href="/">خدمات گردشگری</Link>
          </li>
          <li>
            <Link href="/">درباره ما</Link>
          </li>
          <li>
            <Link href="/">تماس با ما</Link>
          </li>
        </ul>
      </div>
      <div className={styles.authentication}>
        <Image src={profile} width={24} height={24} alt="profile icon" />
        <p>ورود | ثبت نام</p>
      </div>
    </div>
  );
}

export default NavBar;
