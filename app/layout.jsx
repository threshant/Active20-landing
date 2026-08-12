import "./globals.css";
import localFont from "next/font/local";
import { Familjen_Grotesk } from "next/font/google";

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

const familjen = Familjen_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-familjen",
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
      className={`${newScience.variable} ${newScienceExtended.variable} ${familjen.variable} text-[18px]`}
    >
      <body
        className="m-0 overflow-x-hidden text-[#eff8ff] [background:radial-gradient(circle_at_30%_12%,rgba(120,216,255,0.08),transparent_42%),radial-gradient(circle_at_70%_16%,rgba(120,216,255,0.06),transparent_45%),#080a0c] [font-family:var(--font-new-science)] [font-stretch:expanded]"
      >
        {children}
      </body>
    </html>
  );
}
