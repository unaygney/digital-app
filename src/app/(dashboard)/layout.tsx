import { cn } from "@/lib/utils";
import "../globals.css";
import { mainFont } from "@/lib/font";
import { Toaster } from "@/components/ui/toaster";

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
        {children}
        <Toaster />
      </body>
    </html>
  );
}
