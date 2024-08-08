import { db } from "@/db";
import { getTokenAndVerify } from "@/lib/auth";

import { deleteToken } from "./settings/actions";

export default async function Home() {
  const email = await getTokenAndVerify();

  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user) deleteToken();

  return (
    <div className="flex h-full w-full p-4">
      <p>test</p>
    </div>
  );
}
