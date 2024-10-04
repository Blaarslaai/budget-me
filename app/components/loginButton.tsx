"use client";

import { signIn } from "@reflowhq/auth-next/client";
import { useRouter } from "next/navigation";

export default function LoginButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => signIn({ onSuccess: () => router.refresh() })}
      className="ml-2 rounded border border-green-500 px-2 py-1 text-sm text-green-500 hover:text-green-600"
    >
      Login
    </button>
  );
}
