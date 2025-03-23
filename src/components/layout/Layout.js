"use client";
import Footer from "./Footer.js";
import NavBar from "./NavBar.js";
import AuthForm from "../templates/AuthForm.js";
import { useState } from "react";

function Layout({ children }) {
  const style = { minHeight: "400px", maxWidth: "1440px", margin: "0 auto" };
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <NavBar setIsOpen={setIsOpen} />
      <AuthForm setIsOpen={setIsOpen} isOpen={isOpen} />
      <div style={style}>{children}</div>
      <Footer />
    </>
  );
}

export default Layout;
