"use client";

import { ProfileFormData } from "../lib/schema";
import { createContext, use, useState } from "react";

type NullPartial<T> = { [P in keyof T]?: null | T[P] | undefined };

export type ProfileDetails = NullPartial<ProfileFormData>;

export const ProfileContext = createContext<
  [ProfileDetails, React.Dispatch<React.SetStateAction<ProfileDetails>>] | null
>(null);

export default function ProfileProvider({
  children,
  ...props
}: React.PropsWithChildren<ProfileDetails>) {
  const state = useState<ProfileDetails>(props);

  return <ProfileContext value={state}>{children}</ProfileContext>;
}

export function useProfile() {
  return use(ProfileContext)!;
}
