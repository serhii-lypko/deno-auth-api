// @deno-types="npm:@types/express@4"
import express from "npm:express@4.18.2";

import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";

const env = await load();

const app = express();
const port = Number(env["PORT"]) || 3000;

app.get("/", (_req, res) => {
  res.status(200).send("Hello from Deno and Express! 2101zfs");
});

app.listen(port, () => {
  console.log(`Listening on ${port} ...`);
});
