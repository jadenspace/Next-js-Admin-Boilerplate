"use client";

import { useState, useEffect, PropsWithChildren } from "react";

const isMockingMode = process.env.NEXT_PUBLIC_API_MOCKING === "enabled";

function MswProvider({ children }: PropsWithChildren) {
  const [mswReady, setMSWReady] = useState(!isMockingMode);

  useEffect(() => {
    const init = async () => {
      const { initMocks } = await import("../mocks/index");
      await initMocks();
      setMSWReady(true);
    };

    if (!mswReady) {
      init();
    }
  }, [mswReady]);

  if (!mswReady) {
    return null;
  }
  return <>{children}</>;
}

export default MswProvider;
