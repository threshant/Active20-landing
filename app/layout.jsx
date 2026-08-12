import "./globals.css";

export const metadata = {
  title: "Active20",
  description: "Responsive landing page recreated from PDF design",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
