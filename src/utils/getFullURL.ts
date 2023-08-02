import "server-only";

export function getFullURL(pathname: string) {
  return process.env.HOST + pathname;
}
