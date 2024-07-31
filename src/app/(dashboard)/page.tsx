import AccountSettings from "@/components/account-settings";
import ImageUploaderCard from "@/components/image-uploader-cart";
import { db } from "@/db";
import { getTokenAndVerify } from "@/lib/auth";

export default async function Home() {
  const email = await getTokenAndVerify();

  if (!email) return <div>Not authorized</div>;

  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user) return <div>User not found</div>;

  return (
    <div className="flex h-full w-full items-center justify-center">
      <AccountSettings id={user?.id} />
      {/* <ImageUploaderCard /> */}
    </div>
  );
}
