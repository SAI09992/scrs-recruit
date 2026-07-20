import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SCRS | Recruitment Management System",
  description:
    "Recruitment Portal for Soft Computing Research Society (SCRS), Kalasalingam Academy of Research and Education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-manrope bg-white text-brand-navy">
        {children}
      </body>
    </html>
  );
}
