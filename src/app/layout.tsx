import "./globals.css";
import { mainFont } from "@/lib/font";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mainFont.className} scroll-smooth antialiased`}>
        {children}
      </body>
    </html>
  );
}
