import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import logo from "@/static/logo.png"
import profileMain from "@/static/profileMain.png"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Personas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="flex items-center justify-between w-[100vw] h-[7vh] my-5 px-12">
          <img className="max-h-[85%] object-contain" src={logo.src} alt="Logo" />

          <div className="flex flex-row items-center gap-x-10 bg-customDarkBlue rounded-full px-7 h-full">
            <button className="text-white">Dashboard</button>
            <button className="text-white">Select Org</button>
            <button className="text-white">Personas</button>
          </div>

          <img className="h-full object-cover rounded-full" src={profileMain.src} alt="Profile" />
        </nav>
        <div className='px-12'>
          {children}
        </div>
      </body>
    </html>
  );
}
