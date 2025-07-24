import localFont from "next/font/local";

export const jost = localFont({
  src: "./Jost/Jost-VariableFont_wght.woff2",
  variable: "--font-jost",
  display: "swap",
});

export const limeLight = localFont({
  src: "./LimeLight/Limelight-Regular.woff2",
  variable: "--font-limelight",
  display: "swap",
});

export const spaceMono = localFont({
  src: [
    {
      path: "./SpaceMono/SpaceMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./SpaceMono/SpaceMono-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./SpaceMono/SpaceMono-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./SpaceMono/SpaceMono-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-space-mono",
  display: "swap",
});
