import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <h2 className="text-heading">Not Found</h2>
      <p className="text-muted-foreground mb-4">
        Could not find requested resource
      </p>
      <Button variant={"secondary"} asChild>
        <Link href="/">
          <HomeIcon /> Return Home
        </Link>
      </Button>
    </div>
  );
}
