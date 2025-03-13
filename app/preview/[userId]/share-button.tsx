"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ShareButton() {
  const shareLink = () => {
    if (navigator.canShare && navigator.canShare({ url: location.href }))
      navigator.share({ url: location.href });
    else {
      navigator.clipboard.writeText(location.href);
      toast.success("Link copied to clipboard");
    }
  };

  return (
    <Button className="ml-auto basis-1/2 sm:basis-auto" onClick={shareLink}>
      Share
    </Button>
  );
}
