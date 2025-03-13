"use client";

import { useProfile } from "@/features/profile/providers/profile-provider";
import IllustrationPhoneMockup from "./icons/illustration-phone-mockup";
import Image from "next/image";
import { useLinks } from "@/features/links/providers/links-provider";
import PlatformPreview from "./platform-preview";

export default function DeviceMockup() {
  const [profile] = useProfile();
  const { fields: links } = useLinks();

  return (
    <div>
      <div className="relative">
        <IllustrationPhoneMockup />

        {profile.imageUrl && (
          <div className="absolute left-[105.5px] size-[96px] top-[64px] rounded-full border-4 border-primary overflow-hidden">
            <Image
              className="object-cover"
              src={profile.imageUrl}
              alt="profile picture"
              width={96}
              height={96}
            />
          </div>
        )}

        {(profile.firstName || profile.lastName) && (
          <div className="font-semibold text-lg absolute inset-x-0 top-[185px]">
            <div className="min-w-[160px] w-max mx-auto bg-white text-center">
              <span>{profile.firstName}</span> <span>{profile.lastName}</span>
            </div>
          </div>
        )}

        {profile.previewEmail && (
          <div className="absolute inset-x-0 top-[214px]">
            <div className="min-w-[72px] w-max mx-auto bg-white text-muted-foreground text-sm">
              {profile.previewEmail}
            </div>
          </div>
        )}

        <div className="absolute top-[278px] w-[237px] left-[35px] space-y-2">
          {links.slice(0, 5).map((link) => (
            <PlatformPreview key={link.id} {...link} />
          ))}
        </div>
      </div>
    </div>
  );
}
