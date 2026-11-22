"use client";

import * as React from "react";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function Newsletter({ compact = false }: { compact?: boolean }) {
  const [done, setDone] = React.useState(false);
  const id = React.useId();

  if (done) {
    return (
      <p className="inline-flex items-center gap-2 text-sm" role="status">
        <Check className="size-4 text-accent" /> You&apos;re on the list. See you at the next drop.
      </p>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
      className={cn(
        "flex w-full items-center gap-2 border-b border-foreground/30 transition-colors focus-within:border-foreground",
        compact ? "max-w-xs" : "max-w-md",
      )}
    >
      <label htmlFor={id} className="sr-only">Email address</label>
      <input
        id={id}
        type="email"
        required
        placeholder="you@example.com"
        className={cn("min-w-0 flex-1 bg-transparent py-2 outline-none placeholder:text-muted-foreground/70", compact ? "text-sm" : "text-base")}
      />
      <button type="submit" aria-label="Subscribe" className="inline-flex size-9 items-center justify-center rounded-full transition-colors hover:bg-foreground hover:text-background">
        <ArrowRight className="size-4" />
      </button>
    </form>
  );
}
