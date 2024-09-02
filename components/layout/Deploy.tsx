"use client";

import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { MouseEvent } from "react";

import useDeployDisplay from "@/hooks/useDeployDisplay";
import i18n from "@/i18n";
import { useLocaleStore } from "@/stores/locale";
import { ExtendedSession } from "@/types/user";

const CustomButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 14,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "transparent",
  borderColor: "#000",
  color: "#000",
  opacity: 0.38,
  "&:hover, &:active": {
    backgroundColor: "rgba(0,0,0,.15)",
    borderColor: "#000",
  },
  "&.on": {
    backgroundColor: "transparent",
    borderColor: "#000",
    color: "#000",
    opacity: 1,
  },
});

export default function Deploy() {
  const router = useRouter();
  const { data: session } = useSession() as { data: ExtendedSession | null };
  const { branch } = useLocaleStore();
  const { display } = useDeployDisplay();

  const handleClick = (_: MouseEvent<HTMLButtonElement>, item: string) => {
    if (typeof window !== "undefined") {
      const path = window.location.href.split(`/${branch}`)[1];
      router.push(`/${item}${path}`);
    }
  };

  return (
    <>
      {display && (
        <div className="flex h-[64px] items-center gap-3 border-b border-[#e0e0e0] bg-white px-6 text-[13px]">
          {i18n.branch
            .filter((branch) => session?.user?.authority === "master" || session?.user?.authority === branch)
            .map((item: string) => (
              <CustomButton
                key={item}
                variant="outlined"
                className={item === branch ? "on" : ""}
                onClick={(e) => handleClick(e, item)}
              >
                {item.toLocaleUpperCase()}
              </CustomButton>
            ))}
        </div>
      )}
    </>
  );
}
