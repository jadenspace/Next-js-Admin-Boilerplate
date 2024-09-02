"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { MENU_TREE } from "@/constants/navigation";
import { useLocaleStore } from "@/stores/locale";

export default function useDeployDisplay() {
  const pathname = usePathname();
  const { locale } = useLocaleStore();
  const getDisplay = useCallback(
    () => MENU_TREE.some((menuItem) => `/${locale}${menuItem.url}` === pathname && menuItem.isDeploy),
    [locale, pathname],
  );
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    const currentState = getDisplay();
    if (display !== currentState) {
      document.documentElement.style.setProperty("--deploy-height", currentState ? "64px" : "0px");
      setDisplay((current) => !current);
    }
  }, [display, getDisplay, locale, pathname]);

  return {
    display,
  };
}
