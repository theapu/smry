import * as React from "react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/app/config/site";
import Image from "next/image";

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
        <Image
            src="/logo.svg"
            width={100}
            height={100}
            alt={"smry logo"}
            className="-mb-1"
          />
        </div>
      </div>
    </footer>
  );
}
