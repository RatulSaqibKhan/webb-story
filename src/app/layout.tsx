import type { Metadata } from "next";
import { limeLight, jost, spaceMono } from "@/app/fonts";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export const metadata: Metadata = {
  title: "Web Story - Saqib's Personal Blog",
  description: "A personal blog by Saqib, sharing thoughts and experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${limeLight.variable} ${jost.variable} ${spaceMono.variable}`}
      >
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
