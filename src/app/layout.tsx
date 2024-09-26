import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar/SideBarNav";
import { ClientLayout } from "@/components/sidebar/ClientLayout"; // Import a new client-side layout

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Be-U Commit",
  description: "Be-U Commit is a dashboard to monitor your team's development progress."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-gray-50 ${inter.className}`}>
        <ClientLayout>{children}</ClientLayout> {/* Wrap in the client layout */}
      </body>
    </html>
  );
}
