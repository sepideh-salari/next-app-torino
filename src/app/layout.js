import "./globals.css";
import NavBar from "../../components/module/NavBar.jsx";
import Footer from "../../components/module/Footer.jsx";

export const metadata = {
  title: "تورینو - بهترین گردشگری",
  description: "تجربه‌ای متفاوت با تورینو",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
