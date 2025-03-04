import Image from "next/image";
import logo from "../../public/Logo.png";
import Link from "next/link";
import styles from "./Footer.module.css";
import aira from "../../public/aira.png";
import ecunion from "../../public/ecunion.png";
import passengerRights from "../../public/passenger-rights.jpg";
import samandehi from "../../public/samandehi.jpg";
import stateAirline from "../../public/state-airline.png";
import satisfaction from "../../public/satisfaction.png";
import support from "../../public/support.png";
import pric from "../../public/pric.png";

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.topContainer}>
        <div className={styles.price}>
          <Image src={pric} alt="price" width={104} height={104} />
          <div className={styles.content}>
            <h3>بصرفه‌ترین قیمت</h3>
            <p>بصرفه‌ترین و ارزان‌ترین قیمت تور را از ما بخواهید.</p>
          </div>
        </div>
        <div className={styles.support}>
          <Image src={support} alt="support" width={104} height={104} />
          <div className={styles.content}>
            <h3>پشتیبانی</h3>
            <p>پشتیبانی و همراهی ۲۴ ساعته در تمامی مراحل سفر شما.</p>
          </div>
        </div>
        <div className={styles.satisfaction}>
          <Image
            src={satisfaction}
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
              <Image src={logo} alt="Torino Logo" width={146} height={44} />
            </Link>
            <p>تلفن پشتیبانی: 8574-021</p>
          </div>
          <div className={styles.otherSites}>
            <Link href="https://aira.ir" target="_blank">
              <Image
                src={aira}
                alt="Civil Aviation Organization"
                width={68}
                height={74}
              />
            </Link>
            <Link href="https://ecunion.org" target="_blank">
              <Image src={ecunion} alt="ecunion" width={68} height={74} />
            </Link>
            <Link href="https://passengerrights.com" target="_blank">
              <Image
                src={passengerRights}
                alt="Passenger Rights Organization"
                width={68}
                height={74}
              />
            </Link>
            <Link href="https://samandehi.ir" target="_blank">
              <Image
                src={samandehi}
                alt="Samandehi Organization"
                width={68}
                height={74}
              />
            </Link>
            <Link href="https://stateairline.ir" target="_blank">
              <Image
                src={stateAirline}
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
