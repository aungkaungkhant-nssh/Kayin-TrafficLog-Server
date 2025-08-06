import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "kayin-traffic-log",
  description: "Kayin Traffic Log System is a robust application designed to assist traffic officers in efficiently managing traffic offense records. It supports offline data entry, local storage, and synchronization with a remote server to ensure seamless data integrity and accessibility across devices. The system enhances traffic law enforcement through easy searching, updating, and monitoring of offender information and violations, tailored specifically for the Kayin region.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Add favicon link here */}
        <link rel="icon" type="image/png" sizes="32x32" href="police.png" />
        {/* You can add other meta tags here too */}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        {
          children
        }
      </body>
    </html>
  );
}

