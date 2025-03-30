"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "src/core/config/api";
import styles from "./BankAccountForm.module.css";
import Image from "next/image";
import toast from "react-hot-toast";

const schema = yup.object().shape({
  shaba_code: yup
    .string()
    .matches(
      /^IR\d{24}$/,
      "شماره شبا باید با 'IR' شروع شود و 24 رقم داشته باشد"
    )
    .required("شماره شبا الزامی است"),
  debitCard_code: yup
    .string()
    .matches(/^\d{16}$/, "شماره کارت باید 16 رقم باشد")
    .required("شماره کارت الزامی است"),
  accountIdentifier: yup
    .string()
    .matches(/^\d{10,20}$/, "شماره حساب باید بین 10 تا 20 رقم باشد")
    .required("شماره حساب الزامی است"),
});

export default function BankAccountForm({ user }) {
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (user?.payment) {
      setValue("shaba_code", user.payment.shaba_code || "");
      setValue("debitCard_code", user.payment.debitCard_code || "");
      setValue("accountIdentifier", user.payment.accountIdentifier || "");
    }
  }, [user, setValue]);

  return (
    <div className={styles.container}>
      <div className={styles.firstRow}>
        <h2 className={styles.title}>اطلاعات حساب بانکی</h2>
        {!isEditing && (
          <button
            type="button"
            className={styles.button}
            onClick={() => setIsEditing(true)}
          >
            <Image src="/edit-2.png" width={16} height={16} alt="edit icon" />
            ویرایش اطلاعات
          </button>
        )}
      </div>

      <div>
        <label className={styles.label}>شماره شبا</label>
        <input
          type="text"
          value={user?.payment?.shaba_code || ""}
          disabled
          className={styles.input}
        />
        {errors.shaba_code && (
          <span className={styles.error}>{errors.shaba_code.message}</span>
        )}

        <label className={styles.label}>شماره کارت</label>
        <input
          type="text"
          value={user?.payment?.debitCard_code || ""}
          disabled
          className={styles.input}
        />
        {errors.debitCard_code && (
          <span className={styles.error}>{errors.debitCard_code.message}</span>
        )}

        <label className={styles.label}>شماره حساب</label>
        <input
          type="text"
          value={user?.payment?.accountIdentifier || ""}
          disabled
          className={styles.input}
        />
        {errors.accountIdentifier && (
          <span className={styles.error}>
            {errors.accountIdentifier.message}
          </span>
        )}
      </div>
    </div>
  );
}
