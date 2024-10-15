"use client";

import { signIn } from "@reflowhq/auth-next/client";
import { useRouter } from "next/navigation";

export default function LoginButton() {
  const router = useRouter();

  return (
    <a
      onClick={() => signIn({ onSuccess: () => router.refresh() })}
      className="hover:bg-gray-500"
    >
      Sign In
    </a>
  );
}
