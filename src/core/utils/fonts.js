import localFont from "next/font/local";

export const Yekan = localFont({
  src: [
    {
      path: "../../app/fonts/YekanBakh-Light.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../app/fonts/YekanBakh-Regular.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../app/fonts/YekanBakh-Bold.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../app/fonts/YekanBakh-Heavy.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../app/fonts/YekanBakh-Fat.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-yekan",
});

export const Vazirmatn = localFont({
  src: [
    {
      path: "../../app/fonts/Vazirmatn-Light.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../app/fonts/Vazirmatn-Regular.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../app/fonts/Vazirmatn-Bold.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../app/fonts/Vazirmatn-ExtraBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-vazirmatn",
});
