import { ReactNode } from "react";

import MswProvider from "@/app/MswProvider";
import NextAuthProvider from "@/app/NextAuthProvider";
import "@/app/globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <MswProvider>{children}</MswProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
