"use client";

import { ProfileFormData } from "../lib/schema";
import { createContext, use, useState } from "react";

export type ProfileDetails = Partial<ProfileFormData>;

export const ProfileContext = createContext<
  [ProfileDetails, React.Dispatch<React.SetStateAction<ProfileDetails>>] | null
>(null);

export default function ProfileProvider({ children }: React.PropsWithChildren) {
  const state = useState<ProfileDetails>({});

  return <ProfileContext value={state}>{children}</ProfileContext>;
}

export function useProfile() {
  return use(ProfileContext)!;
}
