"use server";

import { auth } from "@/lib/auth";

export async function signUpEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const response = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });

    if (!response) {
      return { error: "Failed to create account" };
    }

    return { success: true };
  } catch (error: any) {
    return { error: error?.message || "Failed to create account" };
  }
}

export async function signInEmail(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const response = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    if (!response) {
      return { error: "Failed to sign in" };
    }

    return { success: true };
  } catch (error: any) {
    return { error: error?.message || "Failed to sign in" };
  }
}
