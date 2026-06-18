"use client";

import React, { useEffect, useState } from "react";

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    async function initMSW() {
      if (typeof window !== "undefined") {
        try {
          // Dynamic import of browser worker to prevent it from bundling in SSR
          const { worker } = await import("@/mocks/browser");
          await worker.start({
            onUnhandledRequest: "bypass",
          });
          setMswReady(true);
        } catch (error) {
          console.error("MSW initialization failed:", error);
          // Fallback: unlock rendering so app does not freeze
          setMswReady(true);
        }
      }
    }

    initMSW();
  }, []);

  if (!mswReady) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-sm font-medium">در حال راه‌اندازی زیرساخت داده‌های فرضی...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
