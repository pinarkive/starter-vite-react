# Release checklist · starter-vite-react

Short checklist before tagging or announcing this repo.

- [ ] **Env:** `PINARKIVE_API_KEY` in `.env`; optional `PINARKIVE_API_BASE_URL`, `PINARKIVE_CLUSTER_ID`, `PORT` reviewed.
- [ ] **Install:** `npm install`
- [ ] **Lint:** `npm run lint`
- [ ] **Build:** `npm run build`
- [ ] **Manual test:** one real upload with a valid key; **CID** shows in UI.
- [ ] **Error path:** e.g. no file selected; confirm error and status.
- [ ] **Production path:** if using `npm start`, confirm `client/dist` exists after `npm run build`.
- [ ] **GitHub:** description + topics (`pinarkive`, `ipfs`, `vite`, `react`, `express`, …).
- [ ] **Media (after publish):** add short + full demo GIFs; link from README **Preview assets**.
- [ ] **LICENSE** present at repo root.
