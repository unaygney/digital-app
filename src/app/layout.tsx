import "./globals.css";

import { cn } from "@/lib/utils";

import { mainFont } from "@/lib/font";
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
          mainFont,
        )}
      >
        {children}
      </body>
    </html>
  );
}
