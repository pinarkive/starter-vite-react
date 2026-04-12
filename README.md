# PinArkive · Vite + React starter

Official PinArkive starter: **Vite** + **React** in **`client/`**, with a small **Express** server that owns **`PINARKIVE_API_KEY`**. The SPA calls **`POST /api/upload`**; Express forwards the file with **`PinarkiveClient`** from **`sdk-ts`**. The API key is not bundled into client JavaScript.

These starters are intended to be published as public repositories under the PinArkive GitHub organization and are free to use.

## What this starter is for

Teams that want a **fast Vite** front end and explicit **Node** boundary for secrets—same origin in dev (Vite proxy) or split static hosting + API in production.

## When to use this vs the others

| Choose **Vite + Express** (this repo) | Choose **Next.js** | Choose **Hono + Workers** |
|---------------------------------------|--------------------|---------------------------|
| Vite SPA + Express proxy | Next on **Vercel**, App Router | **Workers**, single edge deploy |

## Why PinArkive?

[PinArkive](https://pinarkive.com) lets you **upload files**, get **CIDs**, and use **IPFS-backed storage** via an API—without running your own IPFS infrastructure. This repo shows a clean split: browser UI only talks to your server; the server talks to PinArkive.

## Stack

Vite 6 · React 19 · TypeScript · Express · Multer · CORS · **`sdk-ts`** → `@pinarkive/pinarkive-sdk-ts` (server-only under **`server/`**)

## Quick start

```bash
cp .env.example .env
# Set PINARKIVE_API_KEY in .env

npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Vite proxies **`/api`** to Express (**`PORT`**, default **3001**).

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PINARKIVE_API_KEY` | Yes | PinArkive API key. **Express only** — never in `client/`. |
| `PINARKIVE_API_BASE_URL` | No | API v3 base URL. Defaults to `https://api.pinarkive.com` with `/api/v3` if needed. |
| `PINARKIVE_CLUSTER_ID` | No | Optional; SDK `clusterId` (`cl`). Example: `cl0-global`. |
| `PORT` | No | Express port (default **3001**). |
| `VITE_API_BASE_URL` | No | If SPA and API differ by origin, set API base (no trailing slash) and **rebuild** the client. |

## How upload works

1. Browser sends **`multipart/form-data`** with **`file`** to **`POST /api/upload`**.
2. Express reads env vars and **`uploadBufferWithPinarkiveSdk`** in **`server/src/pinarkive.ts`** calls **`PinarkiveClient.uploadFile`** from **`sdk-ts`**.
3. Response body: **`{ ok, cid, data, error? }`**. HTTP status encodes outcome; **`httpStatus` is not in the JSON.**

## HTTP status behavior

| Situation | Status |
|-----------|--------|
| Upload succeeded (`ok: true`) | **200** |
| No file / bad multipart | **400** |
| Empty file | **400** |
| File too large (Multer or SDK path) | **413** |
| Missing `PINARKIVE_API_KEY` | **500** |
| PinArkive API error | SDK **`statusCode`** if **400–599**, else **400** |
| Other unexpected errors | **400** |

## Example success JSON

```json
{
  "ok": true,
  "cid": "bafybeiexample…",
  "data": {
    "cid": "bafybeiexample…",
    "status": "ok"
  }
}
```

## Example error JSON

Missing API key (HTTP **500**):

```json
{
  "ok": false,
  "cid": null,
  "data": null,
  "error": "Missing PINARKIVE_API_KEY. See README and the environment example file in this repository."
}
```

No file (HTTP **400**):

```json
{
  "ok": false,
  "cid": null,
  "data": null,
  "error": "No file provided."
}
```

## Deployment

- **One server:** `npm run build` then `npm start` (Railway, Render, Fly.io, VPS). Set **`PINARKIVE_*`** env vars. If **`client/dist/index.html`** is missing, the server responds with **503** text instead of crashing—run **`npm run build`** first.
- **Split:** host **`client/dist`** on Vercel/Netlify; run Express where you set secrets. Use **`VITE_API_BASE_URL`** at build time if origins differ; CORS is enabled for cross-origin API calls.

## Project structure

```text
client/                 # Vite + React (no sdk-ts, no API key)
server/src/
  index.ts              # Express: upload + static SPA in prod
  pinarkive.ts          # sdk-ts wrapper
  normalize-pinarkive-response.ts
vite.config.ts
```

## Notes on **`sdk-ts`**

- **`sdk-ts`** in **`package.json`** aliases **`@pinarkive/pinarkive-sdk-ts`**.
- Use **`sdk-ts` only in `server/src/`**, never under **`client/`**.

## Preview assets (after publish)

Optional media to add later (nothing is linked until files exist):

- **Short demo (3–5 s):** file pick → upload → CID in UI.
- **Full demo (10–15 s):** install → env → dev server → upload → CID.

Place recordings under e.g. **`docs/`** and link from this section when ready.

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Vite + Express (concurrent) |
| `npm run build` | Vite build + compile server |
| `npm start` | Express + **`client/dist`** |
| `npm run lint` | ESLint |

## License

[MIT License](./LICENSE). PinArkive API usage follows PinArkive’s terms.
