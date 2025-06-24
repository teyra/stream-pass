import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cookieToInitialState } from "wagmi";
import { Providers } from "./providers";
import { getConfig } from "../wagmi";
import { type ReactNode } from "react";
import Navbar from "@/components/NavBar";
import "@arco-design/web-react/dist/css/arco.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stream Pass",
  description: "Web3 Film Investment Platform",
};

export default function RootLayout(props: { children: ReactNode }) {
  const initialState = cookieToInitialState(getConfig());
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${inter.className}`}
      >
        <Providers initialState={initialState}>
          <Navbar />
          {props.children}
        </Providers>
      </body>
    </html>
  );
}
