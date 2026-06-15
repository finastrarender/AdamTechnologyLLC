export function getSiteHeaderOffset(): number {
  if (typeof document === "undefined") return 0;
  const header = document.querySelector(".site-header");
  return header instanceof HTMLElement ? header.offsetHeight : 0;
}

export function scrollToHash(hash: string, behavior: ScrollBehavior = "smooth"): boolean {
  const id = hash.replace(/^#/, "").trim();
  if (!id) return false;

  const element = document.getElementById(id);
  if (!element) return false;

  const offset = getSiteHeaderOffset();
  const top = element.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: Math.max(0, top), behavior });
  return true;
}

export function scrollToHashWithRetry(
  hash: string,
  options?: { behavior?: ScrollBehavior; maxAttempts?: number },
): void {
  const behavior = options?.behavior ?? "smooth";
  const maxAttempts = options?.maxAttempts ?? 16;
  let attempts = 0;

  const tryScroll = () => {
    if (scrollToHash(hash, behavior) || attempts >= maxAttempts) return;
    attempts += 1;
    window.setTimeout(tryScroll, 50);
  };

  tryScroll();
}
