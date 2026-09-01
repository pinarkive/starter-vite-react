import cors from "cors";
import express from "express";
import fs from "fs";
import multer, { type MulterError } from "multer";
import path from "path";
import { uploadBufferWithPinarkiveSdk } from "./pinarkive";

const app = express();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 },
});

const PORT = Number(process.env.PORT) || 3001;

app.use(cors());

app.post("/api/upload", (req, res, next) => {
  upload.single("file")(req, res, (err: unknown) => {
    if (err) {
      const m = err as MulterError;
      if (m.code === "LIMIT_FILE_SIZE") {
        res.status(413).json({
          ok: false,
          cid: null,
          data: null,
          error: "File too large (max 50 MB).",
        });
        return;
      }
      next(err);
      return;
    }

    void (async () => {
      const apiKey = process.env.PINARKIVE_API_KEY?.trim();
      const clusterId = process.env.PINARKIVE_CLUSTER_ID?.trim();

      if (!apiKey) {
        res.status(500).json({
          ok: false,
          cid: null,
          data: null,
          error:
            "Missing PINARKIVE_API_KEY. See README and the environment example file in this repository.",
        });
        return;
      }

      if (!req.file) {
        res.status(400).json({
          ok: false,
          cid: null,
          data: null,
          error: "No file provided.",
        });
        return;
      }

      const { result, httpStatus } = await uploadBufferWithPinarkiveSdk(
        req.file.buffer,
        req.file.originalname || "upload",
        req.file.mimetype,
        {
          apiKey,
          baseUrlFromEnv: process.env.PINARKIVE_API_BASE_URL,
          clusterId,
        }
      );

      res.status(httpStatus).json(result);
    })().catch(next);
  });
});

const clientDist = path.join(process.cwd(), "client", "dist");

app.use(express.static(clientDist));

/**
 * SPA fallback for production (`npm start`). Requires `client/dist` from `vite build`.
 * Without it, `sendFile` fails obscurely; respond with 503 so operators know to build first.
 */
app.get("/{*path}", (_req, res, next) => {
  const indexPath = path.join(clientDist, "index.html");
  if (!fs.existsSync(indexPath)) {
    res
      .status(503)
      .type("text/plain")
      .send(
        "Frontend bundle missing: run `npm run build` to generate client/dist before `npm start`."
      );
    return;
  }
  res.sendFile(indexPath, (sendErr) => {
    if (sendErr) next(sendErr);
  });
});

app.use(
  (
    err: unknown,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error(err);
    res.status(500).json({
      ok: false,
      cid: null,
      data: null,
      error: "Internal server error.",
    });
  }
);

app.listen(PORT, () => {
  console.log(`Upload API + static server on http://127.0.0.1:${PORT}`);
});
