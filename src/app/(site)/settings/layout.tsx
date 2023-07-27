import { SettingsNavigation } from "./(components)/Navigation";
import { getServerSession } from "next-auth";
import EmailNotVerified from "@/components/EmailNotVerified";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function ProfileSettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) return null;

  return (
    <div className="flex-col gap-4 md:flex md:flex-row">
      <SettingsNavigation />
      <div className="w-full p-8 md:w-3/4">
        {session.user.active ? children : <EmailNotVerified />}
      </div>
    </div>
  );
}
