import type { Metadata } from "next";
import Layout from "@/components/Layout";
import "./globals.css";



export const metadata: Metadata = {
  title: "Project Eyes",
  description: "Situational awareness dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
