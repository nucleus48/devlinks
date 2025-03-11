"use client";

import { ProfileFormData } from "../lib/schema";
import { createContext, use, useState } from "react";

export const ProfileContext = createContext<
  | [
      ProfileFormData | undefined,
      React.Dispatch<React.SetStateAction<ProfileFormData | undefined>>
    ]
  | null
>(null);

export default function ProfileProvider({ children }: React.PropsWithChildren) {
  const state = useState<ProfileFormData>();

  return <ProfileContext value={state}>{children}</ProfileContext>;
}

export function useProfile() {
  return use(ProfileContext)!;
}
