import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ReactNode } from "react";

import "../../../globals.css";
import AuthLayoutProvider from "@/app/AuthLayoutProvider";
import AuthLocaleProvider from "@/app/AuthLocaleProvider";
import { AuthRootWrapper } from "@/app/AuthRootWrapper";
import { pretendard, pretendardJP } from "@/app/fonts";
import MswProvider from "@/app/MswProvider";
import MuiXLicense from "@/app/MuiXLicense";
import NextAuthProvider from "@/app/NextAuthProvider";
import ReactQueryProviders from "@/app/ReactQueryProvider";

export default function RootLayout({ children, params: { lang } }: { children: ReactNode; params: { lang: string } }) {
  const fontClassName =
    lang === "jp"
      ? `${pretendardJP.className} ${pretendardJP.variable}`
      : `${pretendard.className} ${pretendard.variable}`;
  return (
    <html lang={lang}>
      <body className={fontClassName}>
        <NextAuthProvider>
          <MswProvider>
            <AppRouterCacheProvider>
              <ReactQueryProviders>
                <AuthLocaleProvider>
                  <AuthLayoutProvider>
                    <AuthRootWrapper>{children}</AuthRootWrapper>
                  </AuthLayoutProvider>
                </AuthLocaleProvider>
              </ReactQueryProviders>
            </AppRouterCacheProvider>
            <MuiXLicense />
          </MswProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
