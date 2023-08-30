import "server-only";

export function getFullURL(pathname: string) {
  // Use "vercel_url" for vercel deployments, if not found then use "host" as fallback for local dev
  const host = process.env.host?.trim();
  const vercelURL = process.env.VERCEL_URL?.trim();

  return (vercelURL ? `https://${vercelURL}` : host) + "/" + pathname;
}
