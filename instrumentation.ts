export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { server } = await import("@/mocks/server"); // setupServer 로 정의한 인스턴스
    server.listen({
      onUnhandledRequest: "bypass",
    });
  }
}
