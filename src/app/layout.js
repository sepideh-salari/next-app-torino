import Layout from "src/components/layout/Layout";
import "./globals.css";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { Yekan, Vazirmatn } from "src/core/utils/fonts.js";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "تورینو - بهترین گردشگری",
  description: "تجربه‌ای متفاوت با تورینو",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${Vazirmatn.variable} ${Yekan.variable} `}
    >
      <body>
        <ReactQueryProvider>
          <Layout>
            <main>{children}</main>
          </Layout>
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
