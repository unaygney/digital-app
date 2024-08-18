import { mainFont } from "@/lib/font";
import "../globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen w-full scroll-smooth antialiased",
          mainFont.className,
        )}
      >
        <main className="h-full w-full bg-linear-page p-4">{children}</main>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
