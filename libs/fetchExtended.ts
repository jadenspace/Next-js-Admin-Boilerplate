import { getCookie } from "cookies-next";
import ky from "ky";
import { getSession, signOut } from "next-auth/react";

import i18n from "@/i18n";

export const kyDefault = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Country: getCookie("branch") || i18n.defaultLocale.split("/")[0],
    Language: getCookie("lang") || i18n.defaultLocale.split("/")[1],
  },
  hooks: {
    beforeRequest: [
      async (request) => {
        const session = await getSession();
        if (session && "accessToken" in session) {
          request.headers.set("Authorization", `Bearer ${session.accessToken}`);
        }
        if (session === null || session.user === {}) {
          await signOut({ redirect: true });
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 401) {
          await signOut({ redirect: true });
        }
      },
    ],
  },
});
