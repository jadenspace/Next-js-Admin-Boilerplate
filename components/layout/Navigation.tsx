"use client";

import FolderIcon from "@mui/icons-material/Folder";
import { pascalCase } from "es-toolkit/string";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import { MENU_TREE, PARENT_MENU_TREE } from "@/constants/navigation";
import { useLocaleStore } from "@/stores/locale";
import { ExtendedSession } from "@/types/user";

export default function Navigation() {
  const { data: session } = useSession() as { data: ExtendedSession | null };
  const pathname = usePathname();
  const { branch, lang } = useLocaleStore();
  const menuBranch = session?.user?.authority === "master" ? "master" : branch;

  return (
    <nav className="pt-2">
      <ul>
        {PARENT_MENU_TREE.map((parentItem) => (
          <li key={parentItem.id} className="w-full px-2">
            <h2 className="pl-[15px] text-[14px] leading-[48px] text-black text-opacity-60">
              {pascalCase(parentItem.title)}
            </h2>
            <ul>
              {MENU_TREE.filter((item) => item.parent === parentItem.title).map((item) => (
                <li key={item.id} className="flex w-full justify-center">
                  <Link
                    className={`flex h-10 w-full items-center gap-8 rounded-md px-4 ${pathname.split(lang)[1].split("/")[1] === item.url.slice(1) ? "bg-primary-selected" : ""} hover:bg-primary-selected`}
                    href={`/${menuBranch}/${lang}${item.url}`}
                  >
                    <FolderIcon htmlColor="rgba(0, 0, 0, 0.56)" />
                    <span className="text-[16px] text-gray-900">{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
}
