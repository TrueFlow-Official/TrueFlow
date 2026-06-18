import * as React from "react";
import { cn } from "@/lib/utils";

interface LoadingStateProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string;
  size?: "sm" | "md" | "lg";
}

export function LoadingState({
  message = "در حال بارگذاری اطلاعات...",
  size = "md",
  className,
  ...props
}: LoadingStateProps) {
  const spinnerSizes = {
    sm: "h-5 w-5 border-2",
    md: "h-8 w-8 border-4",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div
      className={cn(
        "flex min-h-[200px] flex-col items-center justify-center gap-3 p-8 text-center",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "animate-spin rounded-full border-blue-600 border-t-transparent",
          spinnerSizes[size]
        )}
      ></div>
      {message && (
        <p className="text-sm font-medium text-muted-foreground">{message}</p>
      )}
    </div>
  );
}
export type { LoadingStateProps };
