import React, { Suspense } from "react";
import Sidebar from "../../components/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex min-h-dvh w-full flex-col bg-paper font-sans
      md:grid md:grid-cols-[240px_1fr] md:grid-rows-[auto]
      lg:grid-cols-[280px_1fr]"
    >
      <Suspense fallback={<div className="p-4">Loading search…</div>}>
        <Sidebar />
      </Suspense>
      <main className="min-w-0 flex-1 py-2 pb-[calc(4.75rem+env(safe-area-inset-bottom))] md:pb-2">
        {children}
      </main>
    </div>
  );
}
