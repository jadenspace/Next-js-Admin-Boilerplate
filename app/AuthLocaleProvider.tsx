"use client";

import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";

import { useLocaleStore } from "@/stores/locale";

export default function AuthLocaleProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { setLocale } = useLocaleStore();

  useEffect(() => {
    const branch = pathname.split("/")[1];
    const lang = pathname.split("/")[2];
    setLocale([branch, lang]);
  }, [pathname, setLocale]);

  return <>{children}</>;
}
