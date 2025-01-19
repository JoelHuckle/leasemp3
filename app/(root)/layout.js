import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Lease Mp3",
  description: "Automatically list your beats for sale",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={"font-inter relative"}>
        <main className="relative overflow-hidden">{children}</main>
      </body>
    </html>
  );
}
