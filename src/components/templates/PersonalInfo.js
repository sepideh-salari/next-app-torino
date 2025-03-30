"use client";
import { useState, useEffect } from "react";
import { useGetUserData } from "src/core/services/queries";
import api from "src/core/config/api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import styles from "./PersonalInfo.module.css";
import Image from "next/image";

const schema = yup.object().shape({
  fullName: yup.string().required("نام و نام خانوادگی الزامی است"),
  nationalCode: yup
    .string()
    .matches(/^\d{10}$/, "کد ملی باید ۱۰ رقم باشد")
    .required("کد ملی الزامی است"),
  gender: yup.string().required("جنسیت الزامی است"),
  birthDate: yup.string().required("تاریخ تولد الزامی است"),
});

export default function PersonalInfo() {
  const { data, isLoading, error } = useGetUserData();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [isEditing, setIsEditing] = useState(false);
  const user = data?.data || {};

  useEffect(() => {
    if (data) {
      setValue(
        "fullName",
        user.firstName && user.lastName
          ? `${user.firstName} ${user.lastName}`
          : ""
      );
      setValue("gender", user.gender || "");
      setValue("birthDate", user.birthDate || "");
      setValue("nationalCode", user.nationalCode || "");
    }
  }, [data, setValue]);

  const handleSave = async (formData) => {
    const [firstName, lastName] = formData.fullName.trim().split(" ");

    try {
      await api.put("/user/profile", {
        firstName: firstName || "",
        lastName: lastName || "",
        gender: formData.gender,
        birthDate: formData.birthDate,
        nationalCode: formData.nationalCode,
      });
      setIsEditing(false);
      toast.success("اطلاعات با موفقیت به‌روزرسانی شد!");
    } catch (err) {
      console.error("Error updating personal information:", err);
      toast.error("خطا در به‌روزرسانی اطلاعات");
    }
  };

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (error) return <p>خطا در دریافت اطلاعات</p>;

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(handleSave)}>
        <div className={styles.firstRow}>
          <h2 className={styles.title}>اطلاعات شخصی</h2>
          <button
            type={isEditing ? "submit" : "button"}
            className={styles.button}
            onClick={isEditing ? null : () => setIsEditing(true)}
          >
            <Image src="/edit-2.png" width={16} height={16} alt="edit icon" />
            {isEditing ? "ذخیره" : "ویرایش اطلاعات"}
          </button>
        </div>

        <div className={styles.secondRow}>
          <div>
            <label className={styles.label}>نام و نام خانوادگی</label>
            <input
              type="text"
              {...register("fullName")}
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
              {...register("nationalCode")}
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
              {...register("gender")}
              disabled={!isEditing}
              className={styles.input}
            >
              <option value="">انتخاب کنید</option>
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
              {...register("birthDate")}
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
