import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const emailLogin = async (credentials: any) => {
  // server
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const user = await res.json();
    if (user.result) {
      return user;
    }
  } catch (e) {
    console.error("e:", e);
  }
  return null;
};

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: "email-credentials",
      name: "Credentials",
      credentials: {
        email: { label: "id", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        return emailLogin(credentials);
      },
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: `/signin`,
  },
  callbacks: {
    /**
     * 첫 로그인일 때 user 정보를 JWT 토큰에 추가
     * @param token
     * @param user
     */
    async jwt({ token, user }) {
      if (user) {
        // eslint-disable-next-line no-param-reassign
        token = { ...token, user };
      }
      return token;
    },

    /**
     * Session Callback
     * ClientSide에서 NextAuth에 세션을 체크할때마다 실행
     * 반환된 값은 useSession을 통해 ClientSide에서 사용할 수 있음
     * JWT 토큰의 정보를 Session에 유지 시킨다.
     */
    async session({ session, token }) {
      return { ...session, ...token };
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour
  },
  // 복호화
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
