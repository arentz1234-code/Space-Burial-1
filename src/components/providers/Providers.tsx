"use client";

import { ContentProvider } from "./ContentProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ContentProvider>{children}</ContentProvider>;
}
