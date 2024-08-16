import { buttonVariants } from "@/components/ui/button";
import NavLink from "@/components/ui/nav-link";
import { cn } from "@/lib/utils";
import Link from "next/link";
export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const LINKS = [
    {
      id: 0,
      name: "Account",
      href: "/settings",
    },
    {
      id: 1,
      name: "Security",
      href: "/settings/security",
    },
    {
      id: 2,
      name: "Plan",
      href: "/settings/plan",
    },
    {
      id: 3,
      name: "Billing",
      href: "/settings/billing",
    },
    {
      id: 4,
      name: "Notifications",
      href: "/settings/notifications",
    },
  ] as const;

  return (
    <section className="px-4 py-8 lg:px-28">
      <div className="flex flex-col gap-4 md:gap-6">
        <h1 className="text-xl font-semibold leading-7 text-neutral-900 md:text-2xl">
          Settings
        </h1>

        <nav className="flex gap-2 overflow-auto p-1 pb-8">
          {LINKS.map((link) => (
            <NavLink key={link.id} href={link.href}>
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>
      <hr className="pb-8" />
      {children}

      <div className="fixed bottom-8 left-4">
        <Link
          className={cn(
            buttonVariants({ variant: "secondary", size: "large" }),
            "relative flex",
          )}
          href="/"
        >
          <div className="absolute -right-1 -top-1">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neutral-500 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-neutral-300" />
            </span>
          </div>
          Return to chat
        </Link>
      </div>
    </section>
  );
}
