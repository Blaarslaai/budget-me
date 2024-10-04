"use server";

import getAuth from "@/auth";

const auth = getAuth();

export async function refreshUserCookie() {
  await auth.refresh();
}

export async function updateUser(update: UpdateUserOptions) {
  const result = await auth.updateUser(update);

  return result;
}

interface UpdateUserOptions {
  name?: string;
  email?: string;
  photo?: Blob;
  meta?: Record<string, any>;
}
