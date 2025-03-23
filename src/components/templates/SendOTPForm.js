"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useSendOtp } from "src/core/services/mutation.js";
import { isValidMobile } from "src/core/utils/validation.js";
import styles from "./SendOTPForm.module.css";

function SendOTPForm({ setStep, mobile, setMobile }) {
  const [error, setError] = useState("");

  const { isPending, mutate } = useSendOtp();

  const sendOtpHandler = (event) => {
    event.preventDefault();
    if (isPending) return;

    if (!isValidMobile(mobile)) {
      setError("شماره تماس نامعتبر است!");
      return toast.error("شماره تماس نامعتبر است!");
    }

    setError("");

    mutate(
      { mobile },
      {
        onSuccess: (data) => {
          toast.success(data?.data?.message);
          toast(data?.data?.code);
          setStep(2);
        },
        onError: (error) => {
          toast.error("ارسال کد ناموفق بود! لطفاً دوباره امتحان کنید.");
          console.error("OTP Error:", error);
        },
      }
    );
  };

  return (
    <form onSubmit={sendOtpHandler} className={styles.formContainer}>
      <h3>ورود به تورینو</h3>
      <p>شماره موبایل خود را وارد کنید</p>
      <input
        value={mobile}
        onChange={(e) => {
          setMobile(e.target.value);
          if (error) setError("");
        }}
        placeholder={"0912***4252".replace(
          /\d/g,
          (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]
        )}
        className={styles.inputField}
        aria-label="شماره موبایل"
      />
      <p className={styles.errorText} aria-live="polite">
        {error}
      </p>
      <button
        type="submit"
        disabled={isPending}
        className={styles.submitButton}
      >
        {isPending ? "در حال ارسال..." : "ارسال کد تایید"}
      </button>
    </form>
  );
}

export default SendOTPForm;
