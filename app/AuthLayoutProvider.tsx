"use client";

import { debounce } from "es-toolkit";
import { useEffect, useState, ReactNode, useCallback } from "react";

export default function AuthLayoutProvider({ children }: { children: ReactNode }) {
  const [isScroll, setIsScroll] = useState(false);

  const handleResize = useCallback(() => {
    // 스크롤바 여부 확인
    const currentIsScroll = window.innerWidth - document.documentElement.clientWidth > 5;
    if (isScroll !== currentIsScroll) {
      document.documentElement.style.setProperty(
        "--scroll-width",
        `${Math.ceil(window.innerWidth - document.documentElement.getBoundingClientRect().width)}px`,
      );
      setIsScroll((current) => !current);
    }
  }, [isScroll]);
  const debounceLog = debounce(handleResize, 100);

  useEffect(() => {
    debounceLog();
    window.addEventListener("resize", debounceLog);
    window.addEventListener("scroll", debounceLog);

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", debounceLog);
        window.removeEventListener("scroll", debounceLog);
      }
    };
  }, [debounceLog]);

  return <>{children}</>;
}
