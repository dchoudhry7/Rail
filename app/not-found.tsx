import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-32 text-center">
      <p className="font-mono text-sm text-muted-foreground">404</p>
      <h1 className="mt-4 font-display text-6xl tracking-tight">This hanger&apos;s empty.</h1>
      <p className="mt-4 text-muted-foreground">The page you&apos;re after isn&apos;t on the rail any more.</p>
      <Link href="/shop" className="mt-8 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background">Back to the shop</Link>
    </div>
  );
}
