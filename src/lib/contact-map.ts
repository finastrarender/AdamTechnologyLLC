const DEFAULT_OFFICE_ADDRESS = "Office 103, Marasi Dr, Business Bay, Dubai, UAE";

export function buildContactMapEmbedUrl(address?: string, customEmbedUrl?: string): string {
  const custom = customEmbedUrl?.trim();
  if (custom) return custom;

  const query = encodeURIComponent(address?.trim() || DEFAULT_OFFICE_ADDRESS);
  return `https://maps.google.com/maps?q=${query}&hl=en&z=16&output=embed`;
}

export { DEFAULT_OFFICE_ADDRESS };
