import "./globals.css";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import SmoothScroll from "./components/SmoothScroll";

const newScience = localFont({
  src: [
    {
      path: "../public/fonts/NewScience-BoldExtended.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/fonnts.com-New_Science_SemiBold_Extended.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/NewScience-Semibold.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-new-science",
  display: "swap",
});

const newScienceExtended = localFont({
  src: [
    {
      path: "../public/fonts/NewScience-BoldExtended.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/fonnts.com-New_Science_SemiBold_Extended.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-new-science-extended",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Active20",
  description: "Responsive landing page recreated from PDF design",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${newScience.variable} ${newScienceExtended.variable} ${inter.variable} text-[18px]`}
    >
      <body
        className="m-0 bg-[#01111e] text-[#eff8ff] [font-family:var(--font-new-science)] [font-stretch:expanded]"
      >
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
