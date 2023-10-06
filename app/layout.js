import Navbar from "@/components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Head from "next/head";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Vegetal Reco'",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
      </Head>
      <body className={inter.className}>
        <div className="">
          <Navbar />
          <div>{children}</div>
        </div>
      </body>
    </html>
  );
}
