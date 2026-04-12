/** Mirrors the server JSON shape for `POST /api/upload`. */
export type NormalizedPinarkiveResult = {
  ok: boolean;
  cid: string | null;
  data: unknown;
  error?: string;
};
