import "server-only";

export function getFullURL(pathname: string) {
  const host = process.env.host?.trim();
  const vercelURL = process.env.VERCEL_URL?.trim();

  return (vercelURL ? `https://${vercelURL}` : host) + "/" + pathname;
}
