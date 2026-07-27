"use server";

import { redirect } from "next/navigation";

import { signIn } from "@/auth";

export async function handleSignIn(provider: "github" | "google") {
  await signIn(provider, { redirectTo: "/" });
  redirect("/");
}
