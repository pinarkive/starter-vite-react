import type { NormalizedPinarkiveResult } from "./types";

function apiOrigin(): string {
  const base = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "") ?? "";
  return base;
}

/**
 * POST multipart form to the Express proxy. Uses relative `/api` when
 * `VITE_API_BASE_URL` is unset (Vite dev proxy or same-origin Express).
 */
export async function uploadViaProxy(
  file: File
): Promise<NormalizedPinarkiveResult> {
  const fd = new FormData();
  fd.append("file", file);
  const prefix = apiOrigin();
  const res = await fetch(`${prefix}/api/upload`, {
    method: "POST",
    body: fd,
  });
  const body = (await res.json()) as NormalizedPinarkiveResult;
  return body;
}
