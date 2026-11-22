import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="Rail, home" className={cn("group inline-flex items-center gap-2", className)}>
      <svg viewBox="0 0 28 20" aria-hidden="true" className="h-4 w-6 text-foreground">
        <path d="M1 4h26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path
          d="M14 4v3.5M14 7.5 6 15h16l-8-7.5Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
          className="origin-[14px_4px] transition-transform duration-500 group-hover:rotate-[8deg]"
        />
      </svg>
      <span className="font-display text-2xl leading-none tracking-[0.12em]">RAIL</span>
    </Link>
  );
}
