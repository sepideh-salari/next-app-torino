"use client";
import { useState, useEffect } from "react";
import { useGetUserData } from "src/core/services/queries";
import api from "src/core/config/api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import styles from "./BankAccountForm.module.css";
import Image from "next/image";

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

export default function BankAccountForm() {
  const { data, isLoading, error } = useGetUserData();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [isEditing, setIsEditing] = useState(false);
  const user = data?.data || {};

  useEffect(() => {
    if (data) {
      setValue("shaba_code", user.payment?.shaba_code || "");
      setValue("debitCard_code", user.payment?.debitCard_code || "");
      setValue("accountIdentifier", user.payment?.accountIdentifier || "");
    }
  }, [data, setValue]);

  const handleSave = async (formData) => {
    try {
      await api.put("/user/profile", {
        payment: { ...formData },
      });

      setIsEditing(false);
      toast.success("اطلاعات حساب بانکی ذخیره شد!");
    } catch (err) {
      console.error("Error updating bank information:", err);
      toast.error("خطا در ذخیره اطلاعات حساب بانکی");
    }
  };

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (error) return <p>خطا در دریافت اطلاعات</p>;

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(handleSave)}>
        <div className={styles.firstRow}>
          <h2 className={styles.title}>اطلاعات حساب بانکی</h2>
          <button
            type="button"
            className={styles.button}
            onClick={() => setIsEditing((prev) => !prev)}
          >
            <Image src="/edit-2.png" width={16} height={16} alt="edit icon" />
            {isEditing ? "ذخیره" : "ویرایش اطلاعات"}
          </button>
        </div>

        <label className={styles.label}>شماره شبا</label>
        <input
          type="text"
          {...register("shaba_code")}
          disabled={!isEditing}
          className={styles.input}
        />
        {errors.shaba_code && (
          <span className={styles.error}>{errors.shaba_code.message}</span>
        )}

        <label className={styles.label}>شماره کارت</label>
        <input
          type="text"
          {...register("debitCard_code")}
          disabled={!isEditing}
          className={styles.input}
        />
        {errors.debitCard_code && (
          <span className={styles.error}>{errors.debitCard_code.message}</span>
        )}

        <label className={styles.label}>شماره حساب</label>
        <input
          type="text"
          {...register("accountIdentifier")}
          disabled={!isEditing}
          className={styles.input}
        />
        {errors.accountIdentifier && (
          <span className={styles.error}>
            {errors.accountIdentifier.message}
          </span>
        )}
      </form>
    </div>
  );
}
