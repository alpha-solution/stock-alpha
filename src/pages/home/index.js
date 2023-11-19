import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();
  console.log(session);

  const userName = session.user.name.first_name.toUpperCase();

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-center text-black">
        WELCOME {userName}
      </h1>
      <div>
        <Link href="/import">Import</Link>
      </div>
    </div>
  );
}