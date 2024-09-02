import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import createMiddleware from "next-intl/middleware";

import i18n from "./i18n";

const { temporaryLocale, branch, locales, defaultLocale } = i18n;

export function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers?.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });

  // @ts-ignore locales are readonly
  const localeArray: string[] = locales;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  const locale = match(languages, localeArray, defaultLocale);

  // "ko-KR", "en-US", "zh-CN", "zh-TW", "ja-JP", "ar-AE", "en-AU", "en-SG", "ms-MY", "en-CA"
  switch (locale.toLowerCase()) {
    case "ko-kr":
      return "kr/ko";
    case "en-us":
      return "us/en";
    case "zh-cn":
      return "cn/zh";
    case "zh-tw":
      return "tw/zh";
    case "ja-jp":
      return "jp/ja";
    case "ar-ae":
      // return "ae/ar";
      return "ae/en";
    case "en-au":
      return "au/en";
    case "en-sg":
      return "sg/en";
    case "en-ca":
      return "us/en";
    default:
      return "int/en";
  }
}

export default createMiddleware({
  locales,
  defaultLocale,
});

const secret = process.env.NEXTAUTH_SECRET;
export async function middleware(request: NextRequest) {
  const session = await getToken({ req: request, secret, raw: false });

  const { pathname, searchParams } = request.nextUrl;

  if (!session) {
    const res = NextResponse.redirect(new URL(`/signin`, request.url));
    // note: 로그아웃 이후 기존 브랜치 언어 초기화 해야하는 경우 아래 주석 제거
    // res.cookies.delete("branch");
    // res.cookies.delete("lang");
    return res;
  }

  /**
   * locale 설정
   */
  const pathnameIsMissingLocale = temporaryLocale.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );
  const localeInPathname = temporaryLocale.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  function getBranchAndLang() {
    // 마스터 브랜치인 경우 링크가 안붙은 경우 마스터브랜치 우선 리다이렉션
    const requestLocale = getLocale(request);
    const cookiesLanguageValue = request.cookies.get("lang" as any)?.value;
    const branch = session?.user?.authority === "master" ? `master` : requestLocale.split("/")[0];
    const lang =
      cookiesLanguageValue && cookiesLanguageValue !== "undefined" ? cookiesLanguageValue : requestLocale.split("/")[1];
    return `${branch}/${lang}`;
  }

  let locale = localeInPathname || getBranchAndLang();
  // 타 브랜치에서 다른 브랜치 접속시 로케일 재설정
  if (session?.user?.authority && session?.user?.authority !== "master") {
    if (session?.user?.authority !== locale.split("/")[0]) {
      locale = `${session?.user?.authority}/${locale.split("/")[1]}`;
    }
    if (localeInPathname && !pathname.startsWith(`/${locale}/`)) {
      const newPathname = pathname.replace(`\/${pathname.split("/")[1]}\/`, `\/${session?.user?.authority}\/`);
      return NextResponse.redirect(new URL(newPathname, request.url));
    }
  }

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(new URL(`/${locale}/category`, request.url));
  }

  // 빈페이지 접근
  if (pathname === `/${locale}/` || pathname === `/${locale}`) {
    return NextResponse.redirect(new URL(`/${locale}/category`, request.url));
  }
  // signin 페이지 접근
  if (session && pathname.startsWith(`/signin`)) {
    return NextResponse.redirect(new URL(`/${locale}/category`, request.url));
  }

  const res = NextResponse.next();
  if (
    request.cookies.get("branch" as any)?.value !== pathname.split("/")[1] ||
    request.cookies.get("lang" as any)?.value !== pathname.split("/")[2]
  ) {
    res.cookies.set("branch", pathname.split("/")[1], { path: "/" });
    res.cookies.set("lang", pathname.split("/")[2], { path: "/" });
  }
  return res;
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: [
    "/", // Required when i18n is enabled, otherwise middleware won't be executed on index route
    "/((?!api/|signin|google/|_next/|_static/|auth|_vercel|.well-known|fonts|icons|images/|[\\w-]+\\.\\w+).*)",
  ],
};
