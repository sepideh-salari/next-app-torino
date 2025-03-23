import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.topContainer}>
        <div className={styles.price}>
          <Image src="/price.png" alt="price" width={104} height={104} />
          <div className={styles.content}>
            <h3>بصرفه‌ترین قیمت</h3>
            <p>بصرفه‌ترین و ارزان‌ترین قیمت تور را از ما بخواهید.</p>
          </div>
        </div>
        <div className={styles.support}>
          <Image src="/support.png" alt="support" width={104} height={104} />
          <div className={styles.content}>
            <h3>پشتیبانی</h3>
            <p>پشتیبانی و همراهی ۲۴ ساعته در تمامی مراحل سفر شما.</p>
          </div>
        </div>
        <div className={styles.satisfaction}>
          <Image
            src="/satisfaction.png"
            alt="satisfaction"
            width={104}
            height={104}
          />
          <div className={styles.content}>
            <h3>رضایت کاربران</h3>
            <p>رضایت بیش از ۱۰ هزار کاربر از تورهای ما.</p>
          </div>
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.torino}>
          <h3>تورینو</h3>
          <ul>
            <li>
              <Link href="/about">درباره ما</Link>
            </li>
            <li>
              <Link href="/contact">تماس با ما</Link>
            </li>
            <li>
              <Link href="/why-torino">چرا تورینو</Link>
            </li>
            <li>
              <Link href="/insurance">بیمه مسافرتی</Link>
            </li>
          </ul>
        </div>

        <div className={styles.services}>
          <h3>خدمات مشتریان</h3>
          <ul>
            <li>
              <Link href="/support">پشتیبانی آنلاین</Link>
            </li>
            <li>
              <Link href="/guide">راهنمای خرید</Link>
            </li>
            <li>
              <Link href="/insurance">بیمه مسافرتی</Link>
            </li>
            <li>
              <Link href="/refund">راهنمای استرداد</Link>
            </li>
            <li>
              <Link href="/faq">پرسش و پاسخ</Link>
            </li>
          </ul>
        </div>

        <div className={styles.logoContainer}>
          <div className={styles.logo}>
            <Link href="/">
              <Image
                src="/Logo.png"
                alt="Torino Logo"
                width={146}
                height={44}
              />
            </Link>
            <p>
              تلفن پشتیبانی:
              <span>
                {"1840-021".replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)])}
              </span>
            </p>
          </div>
          <div className={styles.otherSites}>
            <Link href="https://aira.ir" target="_blank">
              <Image
                src="/aira.png"
                alt="Civil Aviation Organization"
                width={68}
                height={74}
              />
            </Link>
            <Link href="https://ecunion.org" target="_blank">
              <Image src="/ecunion.png" alt="ecunion" width={68} height={74} />
            </Link>
            <Link href="https://passengerrights.com" target="_blank">
              <Image
                src="/passenger-rights.jpg"
                alt="Passenger Rights Organization"
                width={68}
                height={74}
              />
            </Link>
            <Link href="https://samandehi.ir" target="_blank">
              <Image
                src="/samandehi.jpg"
                alt="Samandehi Organization"
                width={68}
                height={74}
              />
            </Link>
            <Link href="https://stateairline.ir" target="_blank">
              <Image
                src="/state-airline.png"
                alt="State Airline Organization"
                width={68}
                height={74}
              />
            </Link>
          </div>
        </div>
      </div>
      <p>کلیه حقوق این وب سایت متعلق به تورینو میباشد.</p>
    </div>
  );
}

export default Footer;
