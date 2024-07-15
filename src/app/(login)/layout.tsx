import "../globals.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen w-full bg-linear-page p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
