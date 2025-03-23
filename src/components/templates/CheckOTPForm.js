"use client";

import { useCheckOtp } from "src/core/services/mutation.js";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import OTPInput from "react-otp-input";
import styles from "./CheckOTPForm.module.css";

function CheckOTPForm({ mobile, setIsOpen, setStep }) {
  const [code, setCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(120);
  const [canResend, setCanResend] = useState(false);
  const { isPending, mutate } = useCheckOtp();

  useEffect(() => {
    if (timeLeft === 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleChange = (enteredOtp) => {
    setCode(enteredOtp);
  };

  const checkOtpHandler = (event) => {
    event.preventDefault();

    if (isPending) return;

    mutate(
      { mobile, code },
      {
        onSuccess: () => {
          setIsOpen(false);
          setStep(1);
        },
        onError: (error) => toast.error(error?.message),
      }
    );
  };

  return (
    <form onSubmit={checkOtpHandler} className={styles.formContainer}>
      <h3>کد تایید را وارد کنید.</h3>
      <p className={styles.otpText}>
        کد تایید به شماره{" "}
        {mobile.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)])} ارسال شد
      </p>
      <div className={styles.otpInputWrapper}>
        <OTPInput
          value={code}
          onChange={handleChange}
          numInputs={6}
          renderInput={(props) => (
            <input {...props} className={styles.otpInputField} />
          )}
        />
      </div>
      <div className={styles.resend}>
        {timeLeft > 0 ? (
          <p className={styles.timerText}>
            {` ${Math.floor(timeLeft / 60)}:${
              timeLeft % 60 < 10 ? "0" + (timeLeft % 60) : timeLeft % 60
            } تا ارسال مجدد کد`}
          </p>
        ) : (
          canResend && (
            <p className={styles.resendLink} onClick={() => setStep(1)}>
              ارسال مجدد کد
            </p>
          )
        )}
      </div>
      <button type="submit" className={styles.submitButton}>
        ورود به تورینو
      </button>
    </form>
  );
}

export default CheckOTPForm;
