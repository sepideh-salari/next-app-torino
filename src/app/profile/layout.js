"use client";

import { usePathname } from "next/navigation";
import AuthProvider from "@/providers/AuthProvider";
import Link from "next/link";
import styles from "./layout.module.css";
import Image from "next/image";

function ProfileLayout({ children }) {
  const pathname = usePathname();

  return (
    <AuthProvider>
      <div className={styles.container}>
        <ul className={styles.list}>
          <li
            className={`${styles.items} ${
              pathname === "/profile" ? styles.active : ""
            }`}
          >
            <Image
              src="/profile.png"
              width={24}
              height={24}
              alt="profile icon"
            />
            <Link href="/profile">پروفایل من</Link>
          </li>
          <li
            className={`${styles.items} ${
              pathname === "/profile/my-tours" ? styles.active : ""
            }`}
          >
            <Image
              src="/sun-fog.png"
              width={24}
              height={24}
              alt="my tours icon"
            />
            <Link href="/profile/my-tours">تور های من</Link>
          </li>
          <li
            className={`${styles.items} ${
              pathname === "/profile/transactions" ? styles.active : ""
            }`}
          >
            <Image
              src="/convert-card.png"
              width={24}
              height={24}
              alt="transactions icon"
            />
            <Link href="/profile/transactions">تراکنش‌ها</Link>
          </li>
        </ul>
        {children}
      </div>
    </AuthProvider>
  );
}

export default ProfileLayout;
