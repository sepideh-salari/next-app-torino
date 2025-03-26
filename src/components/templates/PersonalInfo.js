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
    setValue(
      "fullName",
      user.firstName && user.lastName
        ? `${user.firstName} ${user.lastName}`
        : ""
    );
    setValue("gender", user.gender || "");
    setValue("birthDate", user.birthDate || "");
    setValue("nationalCode", user.nationalCode || "");
  };

  const handleSave = async (data) => {
    const [firstName, lastName] = data.fullName.trim().split(" ");

    try {
      await api.put("/user/profile", {
        firstName: firstName || "",
        lastName: lastName || "",
        gender: data.gender,
        birthDate: data.birthDate,
        nationalCode: data.nationalCode,
      });
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
        <div className={styles.firstRow}>
          <h2 className={styles.title}>اطلاعات شخصی</h2>
          <button
            type="submit"
            className={styles.button}
            onClick={isEditing ? null : () => setIsEditing(true)}
          >
            <Image src="/edit-2.png" width={16} height={16} alt="edit icon" />
            {isEditing ? "ذخیره" : "ویرایش"}
          </button>
        </div>

        <div className={styles.secondRow}>
          <div>
            <label className={styles.label}>نام و نام خانوادگی</label>
            <input
              type="text"
              {...register("fullName", {
                required: "نام و نام خانوادگی الزامی است",
              })}
              disabled={!isEditing}
              className={styles.input}
            />
            {errors.fullName && (
              <p className={styles.error}>{errors.fullName.message}</p>
            )}
          </div>
          <div>
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
          </div>
        </div>
        <div className={styles.thirdRow}>
          <div>
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
          </div>
          <div>
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
          </div>
        </div>
      </form>
    </div>
  );
}
