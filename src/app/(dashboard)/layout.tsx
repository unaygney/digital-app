import { cn } from "@/lib/utils";
import "../globals.css";
import { mainFont } from "@/lib/font";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/components/providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen scroll-smooth font-sans antialiased",
          mainFont.className,
        )}
      >
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
