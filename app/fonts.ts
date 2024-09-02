import localFont from "next/font/local";

export const pretendard = localFont({
  src: "../public/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "200 700",
  display: "swap",
  fallback: [
    "'Pretendard Variable'",
    "Pretendard",
    "-apple-system",
    "BlinkMacSystemFont",
    "system-ui",
    "Roboto",
    "'Helvetica Neue'",
    "'Apple SD Gothic Neo'",
    "sans-serif",
  ],
});

export const pretendardJP = localFont({
  src: "../public/fonts/PretendardJPVariable.woff2",
  variable: "--font-pretendard-jp",
  weight: "200 700",
  display: "swap",
  fallback: [
    "'Pretendard JP Variable'",
    "'Pretendard Variable'",
    "Pretendard",
    "-apple-system",
    "BlinkMacSystemFont",
    "system-ui",
    "Roboto",
    "'Helvetica Neue'",
    "'Apple SD Gothic Neo'",
    "sans-serif",
  ],
});