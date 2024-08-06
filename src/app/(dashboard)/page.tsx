import { db } from "@/db";
import { getTokenAndVerify } from "@/lib/auth";

import { deleteToken } from "./actions";
import BillingInformation from "@/components/billing-information";
export default async function Home() {
  const email = await getTokenAndVerify();

  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user) deleteToken();

  return (
    <div className="flex h-full w-full p-4">
      <BillingInformation />
    </div>
  );
}
