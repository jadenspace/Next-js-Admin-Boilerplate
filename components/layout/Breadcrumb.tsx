"use client";

import { pascalCase } from "es-toolkit/string";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

import { MENU_TREE } from "@/constants/navigation";
import { useLocaleStore } from "@/stores/locale";

export default function Breadcrumb() {
  const pathname = usePathname();
  const { branch, lang } = useLocaleStore();
  const [title, setTitle] = useState("");

  useEffect(() => {
    const currentTitle = MENU_TREE.filter((menu) => menu.url === pathname.split(lang)[1])[0]?.title;
    if (currentTitle) {
      setTitle(currentTitle);
    }
  }, [lang, pathname, title]);

  return (
    <h1 className="flex h-[72px] items-center border-b border-[#e0e0e0] bg-white px-6 text-[24px]">
      {pascalCase(title)} ({branch?.toLocaleUpperCase()})
    </h1>
  );
}
