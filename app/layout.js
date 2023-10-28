import Navbar from "@/components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import { ToastContainer } from 'react-toastify';
import { Analytics } from '@vercel/analytics/react';
import 'react-toastify/dist/ReactToastify.css';
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
      <head><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" /></head>
      <body className={inter.className}>
        <div className="">
          <Navbar />
          <div>{children}</div>
          <Analytics />
          <ToastContainer />
        </div>
      </body>
    </html>
  );
}
