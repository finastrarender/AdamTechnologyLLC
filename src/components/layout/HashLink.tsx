"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { scrollToHashWithRetry } from "@/lib/scroll-to-hash";

type HashLinkProps = ComponentProps<typeof Link>;

function getHashFromHref(href: HashLinkProps["href"]): string | null {
  if (typeof href !== "string") return null;
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) return null;
  return href.slice(hashIndex);
}

function getPathFromHref(href: HashLinkProps["href"]): string {
  if (typeof href !== "string") return "";
  const hashIndex = href.indexOf("#");
  const path = hashIndex === -1 ? href : href.slice(0, hashIndex);
  return path || "/";
}

export default function HashLink({ href, onClick, ...props }: HashLinkProps) {
  const hash = getHashFromHref(href);

  return (
    <Link
      href={href}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || !hash) return;

        const targetPath = getPathFromHref(href);
        const currentPath = window.location.pathname;

        if (targetPath === currentPath) {
          event.preventDefault();
          window.history.pushState(null, "", `${targetPath}${hash}`);
          scrollToHashWithRetry(hash);
        }
      }}
    />
  );
}
