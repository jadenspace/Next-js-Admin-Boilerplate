import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

type UseLocaleStore = {
  branch: string;
  lang: string;
  locale: string;
  setLocale: (locale: [string, string]) => void;
  setBranch: (branch: string) => void;
  setLang: (lang: string) => void;
};
export const useLocaleStore = create(
  devtools(
    persist<UseLocaleStore>(
      (set) => ({
        locale: "",
        branch: "",
        lang: "",
        setLocale: (locale) =>
          set({
            locale: locale.join("/"),
            branch: locale[0],
            lang: locale[1],
          }),
        setBranch: (branch) => set({ branch }),
        setLang: (lang) => set({ lang }),
      }),
      {
        name: "locale-storage", // name of the item in the storage (must be unique)
      },
    ),
  ),
);

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("useLocaleStore", useLocaleStore);
}
