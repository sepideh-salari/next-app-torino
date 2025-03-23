"use client";
import { useState } from "react";
import { useGetUserData } from "src/core/services/queries";
import api from "src/core/config/api";
import { useForm } from "react-hook-form";
import styles from "./PersonalInfo.module.css";
import Image from "next/image";

export default function PersonalInfo() {
  const { data, isLoading, error } = useGetUserData();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [isEditing, setIsEditing] = useState(false);

  const user = data?.data || {};

  const prefillForm = () => {
    setValue("firstName", user.firstName || "");
    setValue("lastName", user.lastName || "");
    setValue("gender", user.gender || "");
    setValue("birthDate", user.birthDate || "");
    setValue("nationalCode", user.nationalCode || "");
  };

  const handleSave = async (data) => {
    try {
      await api.put("/user/profile", { ...data });
      setIsEditing(false);
      alert("اطلاعات با موفقیت به‌روزرسانی شد!");
    } catch (err) {
      console.error("Error updating personal information:", err);
      alert("خطا در به‌روزرسانی اطلاعات");
    }
  };

  if (data) prefillForm();

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (error) return <p>خطا در دریافت اطلاعات</p>;

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(handleSave)}>
        <h2 className={styles.title}>اطلاعات شخصی</h2>
        <button
          type="submit"
          className={styles.button}
          onClick={isEditing ? null : () => setIsEditing(true)}
        >
          <Image src="/edit-2.png" width={16} height={16} alt="edit icon" />
          {isEditing ? "ذخیره" : "ویرایش"}
        </button>
        <label className={styles.label}>نام</label>
        <input
          type="text"
          {...register("firstName", { required: "نام الزامی است" })}
          disabled={!isEditing}
          className={styles.input}
        />
        {errors.firstName && (
          <p className={styles.error}>{errors.firstName.message}</p>
        )}

        <label className={styles.label}>نام خانوادگی</label>
        <input
          type="text"
          {...register("lastName", { required: "نام خانوادگی الزامی است" })}
          disabled={!isEditing}
          className={styles.input}
        />
        {errors.lastName && (
          <p className={styles.error}>{errors.lastName.message}</p>
        )}

        <label className={styles.label}>جنسیت</label>
        <select
          {...register("gender", { required: "جنسیت الزامی است" })}
          disabled={!isEditing}
          className={styles.input}
        >
          <option value="male">مرد</option>
          <option value="female">زن</option>
        </select>
        {errors.gender && (
          <p className={styles.error}>{errors.gender.message}</p>
        )}

        <label className={styles.label}>تاریخ تولد</label>
        <input
          type="date"
          {...register("birthDate", { required: "تاریخ تولد الزامی است" })}
          disabled={!isEditing}
          className={styles.input}
        />
        {errors.birthDate && (
          <p className={styles.error}>{errors.birthDate.message}</p>
        )}

        <label className={styles.label}>کد ملی</label>
        <input
          type="text"
          {...register("nationalCode", { required: "کد ملی الزامی است" })}
          disabled={!isEditing}
          className={styles.input}
        />
        {errors.nationalCode && (
          <p className={styles.error}>{errors.nationalCode.message}</p>
        )}
      </form>
    </div>
  );
}
