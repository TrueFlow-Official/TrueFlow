"use client";

import { Toaster as SonnerToaster } from "sonner";

export function ToastProvider() {
  return (
    <SonnerToaster
      dir="rtl"
      position="top-center"
      richColors
      closeButton
      toastOptions={{
        style: {
          fontFamily: "inherit",
        },
      }}
    />
  );
}
