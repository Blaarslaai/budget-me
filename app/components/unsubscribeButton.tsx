"use client";

import { modifySubscription } from "@reflowhq/auth-next/client";
import { useRouter } from "next/navigation";

export default function UnsubscribeButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => modifySubscription({ onSuccess: () => router.refresh() })}
      className="text-red-500 underline"
    >
      <strong>Unsubscribe</strong>
    </button>
  );
}
