import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-start justify-center gap-6 px-10">
      <span className="font-serif text-[120px] font-bold leading-none text-ink">
        404
      </span>
      <i className="block h-1.5 w-16 rounded-full bg-accent" />

      <div className="flex flex-col gap-2">
        <h1 className="font-serif text-[34px] font-bold">Page not found</h1>
        <p className="max-w-md text-muted">
          This title has wandered off the shelf. The page may have been moved,
          or the link is mistyped.
        </p>
      </div>

      <div className="flex gap-3">
        <Link
          href="/"
          className="flex h-11 items-center rounded-md bg-ink px-5 text-[15px] font-semibold text-paper no-underline transition hover:bg-accent"
        >
          Back to home
        </Link>
        <Link
          href="/search"
          className="flex h-11 items-center rounded-md border-[1.5px] border-ink px-5 text-[15px] font-semibold text-ink no-underline transition hover:bg-ink hover:text-paper"
        >
          Search titles
        </Link>
      </div>
    </div>
  );
}
