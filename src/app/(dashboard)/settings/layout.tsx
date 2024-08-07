import NavLink from "@/components/ui/nav-link";
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
    </section>
  );
}
