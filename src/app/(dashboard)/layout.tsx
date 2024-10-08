import { cn } from "@/lib/utils";
import "../globals.css";
import { mainFont } from "@/lib/font";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/components/providers";
import { Analytics } from "@vercel/analytics/react";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full w-full">
      <body
        className={cn(
          "h-full w-full scroll-smooth font-sans antialiased",
          mainFont.className,
        )}
      >
        <Providers>{children}</Providers>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
