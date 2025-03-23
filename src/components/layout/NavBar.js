import { useRouter } from "next/navigation";
import { useGetUserData } from "src/core/services/queries";
import Image from "next/image";
import Link from "next/link";
import styles from "./NavBar.module.css";

function NavBar({ setIsOpen }) {
  const { isPending, data } = useGetUserData();
  const router = useRouter();

  const isAuthenticated = data?.data;

  return (
    <div className={styles.navBarContainer}>
      <div className={styles.navBar}>
        <div className={styles.logo}>
          <Link href="/">
            <Image src="/Logo.png" alt="Torino Logo" width={146} height={44} />
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
        {isAuthenticated ? (
          <div className={styles.dropdown}>
            <div className={styles.dropdownButton}>
              <Image
                src="/profile.png"
                width={24}
                height={24}
                alt="profile icon"
              />
              <span>
                {data?.data?.mobile.replace(
                  /\d/g,
                  (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]
                )}
              </span>
              <Image
                src="/arrow-down.png"
                width={20}
                height={20}
                alt="arrow icon"
              />
            </div>
            <div className={styles.dropdownContent}>
              <Link href="/profile">
                <Image
                  src="/profile-gray.png"
                  width={20}
                  height={20}
                  alt="profile icon"
                />
                پروفایل
              </Link>
              <a
                href="#"
                onClick={() => {
                  /* Add logout logic here */
                }}
              >
                خروج
              </a>
            </div>
          </div>
        ) : (
          <button onClick={() => setIsOpen(true)} className={styles.authButton}>
            <div className={styles.authentication}>
              <Image
                src="/profile.png"
                width={24}
                height={24}
                alt="profile icon"
              />
              <p>ورود | ثبت نام</p>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}

export default NavBar;
