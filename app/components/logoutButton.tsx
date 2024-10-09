"use client";

import { signOut } from "@reflowhq/auth-next/client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  return (
    <a onClick={() => signOut({ onSuccess: () => router.refresh() })}>
      Sign Out
    </a>
  );
}
