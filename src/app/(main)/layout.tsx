import React from "react";
import { Suspense } from "react";
import Sidebar from "../../components/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="w-full h-full font-sans bg-paper grid md:grid-cols-[minmax(0,0.2fr)_minmax(0,0.8fr)]
      lg:grid-cols-[minmax(0,0.15fr)_minmax(0,0.85fr)]"
    >
      <Suspense fallback={<p>Loading search…</p>}>
        <Sidebar />
      </Suspense>

      <main className="min-w-0 flex-1 px-9">{children}</main>
    </div>
  );
}
