import { Platforms } from "@/features/links/constants/platforms";
import Link from "next/link";
import ArrowRightIcon from "./icons/arrow-right";
import { cn } from "@/lib/utils";

export type PlatformPreviewProps = {
  platform: string;
  url: string;
  className?: string;
};

export default function PlatformPreview({
  platform,
  url,
  className,
}: PlatformPreviewProps) {
  const data = Platforms.find((item) => item.platform === platform);

  if (!data) return null;

  return (
    <Link
      className={cn(
        "flex items-center text-white p-4 gap-2 rounded-sm [&_svg]:size-5",
        className
      )}
      style={{ backgroundColor: data.color }}
      href={url}
    >
      {data.icon}
      {data.platform}
      <ArrowRightIcon className="ml-auto" />
    </Link>
  );
}
