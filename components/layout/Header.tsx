"use client";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import { usePopupState } from "material-ui-popup-state/hooks";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

import { useLocaleStore } from "@/stores/locale";
import { ExtendedSession } from "@/types/user";

export default function Header({ ...props }) {
  const { data: session } = useSession() as { data: ExtendedSession | null };
  const { branch } = useLocaleStore();
  const popupState = usePopupState({ variant: "popover", popupId: "demo-popup-menu" });
  const onLogout = async () => {
    await signOut({ callbackUrl: "/" });
    popupState.close();
  };

  return (
    <header {...props} className="flex items-center justify-between px-10 text-[20px]">
      <h1 className="flex gap-2">
        <Image
          src="https://vercel.com/mktng/_next/static/media/logo-vercel-logotype-light.700a8d26.svg"
          alt=""
          width={283}
          height={64}
          className="w-[50%]"
        />
      </h1>
      <div className="flex gap-4">
        <strong>{session?.user?.authority?.toUpperCase()} ADMIN</strong>
        <PopupState variant="popover" popupId="popup-menu">
          {() =>
            (
              <>
                <button {...bindTrigger(popupState)}>
                  <span className="!font-extralight">Account</span>
                </button>
                <Menu {...bindMenu(popupState)}>
                  <MenuItem onClick={onLogout}>
                    <span>Logout</span>
                  </MenuItem>
                </Menu>
              </>
            ) as any
          }
        </PopupState>
      </div>
    </header>
  );
}
