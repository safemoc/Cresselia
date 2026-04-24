import type { Metadata } from "next";

import type { UserProfile } from "@/lib/api";
import { serverHttp } from "@/lib/api/server";

import { HomeClient } from "./HomeClient";

export const metadata: Metadata = {
  title: "梦乡 · Cresselia",
  description: "向月亮许下愿望，让 AI 为你织梦成片。",
};

export default async function HomePage() {
  let initialUser: UserProfile | null = null;
  try {
    initialUser = await serverHttp.get<UserProfile>("/auth/me");
  } catch {
    initialUser = null;
  }

  return <HomeClient initialUser={initialUser} />;
}
