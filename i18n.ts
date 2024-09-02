const i18n = {
  temporaryLocale: [
    "master/ko",
    "master/en",
    "master/zh",
    "master/ja",

    "kr/ko",
    "kr/en",
    "kr/zh",
    "kr/ja",

    "us/ko",
    "us/en",
    "us/zh",
    "us/ja",

    "jp/ko",
    "jp/en",
    "jp/zh",
    "jp/ja",

    "cn/ko",
    "cn/en",
    "cn/zh",
    "cn/ja",

    "au/ko",
    "au/en",
    "au/zh",
    "au/ja",

    "sg/ko",
    "sg/en",
    "sg/zh",
    "sg/ja",

    "ae/ko",
    "ae/en",
    "ae/zh",
    "ae/ja",

    "int/ko",
    "int/en",
    "int/zh",
    "int/ja",
  ],
  branch: ["master", "kr", "us", "cn", "tw", "jp", "ae", "au", "sg", "int"],
  lang: ["ko", "en", "zh", "ja"],
  locales: ["ko-KR", "en-US", "zh-CN", "zh-TW", "ja-JP", "ar-AE", "en-AU", "en-SG", "en-CA"],
  defaultLocale: "kr/ko",
  defaultBranch: "kr",
  localeDetection: false,
  pages: {
    "*": ["common"],
  },
};

export default i18n;
export type Country = (typeof i18n)["country"][number];
export type Locale = (typeof i18n)["locales"][number];
