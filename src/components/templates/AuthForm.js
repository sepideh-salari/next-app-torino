"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ModalContainer from "src/components/container/ModalContainer.js";
import { useGetUserData } from "src/core/services/queries.js";
import CheckOTPForm from "./CheckOTPForm";
import SendOTPForm from "./SendOTPForm";

function AuthForm({ isOpen, setIsOpen }) {
  const [mobile, setMobile] = useState("");
  const [step, setStep] = useState(1);

  const { data } = useGetUserData();

  useEffect(() => {
    if (!isOpen) setStep(1);
  }, [isOpen]);

  return (
    <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen}>
      {step === 1 && (
        <SendOTPForm setStep={setStep} mobile={mobile} setMobile={setMobile} />
      )}
      {step === 2 && (
        <CheckOTPForm mobile={mobile} setIsOpen={setIsOpen} setStep={setStep} />
      )}
    </ModalContainer>
  );
}

export default AuthForm;
