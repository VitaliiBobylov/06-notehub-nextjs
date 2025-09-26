"use client";

import { useState, ReactNode } from "react";
import {
  QueryClient,
  QueryClientProvider,
  hydrate,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

type Props = {
  children: ReactNode;
  dehydratedState?: unknown;
};

export default function TanStackProvider({ children, dehydratedState }: Props) {
  const [queryClient] = useState(() => new QueryClient());

  if (dehydratedState) {
    hydrate(queryClient, dehydratedState);
  }

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
