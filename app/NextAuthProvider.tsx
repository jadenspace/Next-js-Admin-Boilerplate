"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export default function NextAuthProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider refetchInterval={60 * 5} refetchOnWindowFocus>
      {children}
    </SessionProvider>
  );
}
