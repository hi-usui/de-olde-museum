import express from "express";

import { Arts } from "#src/controllers/arts";

const router = express.Router();

router.get("/new", Arts.new);

export const arts = router;
