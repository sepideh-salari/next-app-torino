"use client";
import { useState } from "react";
import { useGetUserData } from "src/core/services/queries";
import api from "src/core/config/api";
import { useForm } from "react-hook-form";
import styles from "./AccountInfo.module.css";
import Image from "next/image";
export default function AccountInfo() {
  const { data, isLoading, error } = useGetUserData();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [isEditing, setIsEditing] = useState(false);

  const user = data?.data || {};
  const phoneNumber = user.mobile || "در حال بارگذاری...";

  const prefillForm = () => {
    setValue("email", user.email || "_");
  };

  const handleSave = async (data) => {
    try {
      await api.put("/user/profile", { email: data.email });
      setIsEditing(false);
      alert("ایمیل با موفقیت به‌روزرسانی شد!");
    } catch (err) {
      console.error("Error updating email:", err);
      alert("خطا در به‌روزرسانی ایمیل");
    }
  };

  if (data) prefillForm();

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (error) return <p>خطا در دریافت اطلاعات</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>اطلاعات حساب کاربری</h2>

      <form onSubmit={handleSubmit(handleSave)}>
        <label className={styles.label}>شماره موبایل</label>
        <input
          type="text"
          value={phoneNumber}
          disabled
          className={styles.input}
        />
        <label className={styles.label}>ایمیل</label>
        <input
          type="email"
          {...register("email", { required: "ایمیل الزامی است" })}
          disabled={!isEditing}
          className={styles.input}
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}

        <button
          type="submit"
          className={styles.button}
          onClick={isEditing ? null : () => setIsEditing(true)}
        >
          <Image src="/edit-2.png" width={16} height={16} alt="arrow icon" />
          {isEditing ? "ذخیره" : "افزودن"}
        </button>
      </form>
    </div>
  );
}
