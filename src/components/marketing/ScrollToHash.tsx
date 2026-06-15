"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { scrollToHashWithRetry } from "@/lib/scroll-to-hash";

export default function ScrollToHash() {
  const pathname = usePathname();

  useEffect(() => {
    const run = () => {
      const hash = window.location.hash;
      if (!hash) return;
      scrollToHashWithRetry(hash);
    };

    run();
    window.addEventListener("hashchange", run);
    return () => window.removeEventListener("hashchange", run);
  }, [pathname]);

  return null;
}
