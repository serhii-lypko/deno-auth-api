// @deno-types="npm:@types/express"
import express, { NextFunction, Request, Response } from "npm:express@4.18.2";
import { PrismaClient } from './generated/client/deno/edge.ts'

import demoData from "./data_blob.json" with { type: "json" };

const prisma = new PrismaClient();

const app = express();
const port = Number(Deno.env.get("PORT")) || 8000;

const reqLogger = async function (req: Request, _res: Response, next: NextFunction) {
  await prisma.log.create({
    data: {
      level: 'Info',
      message: `${req.method} ${req.url}`,
      meta: {
        headers: JSON.stringify(req.headers),
      },
    },
  })

  next();
};

app.use(reqLogger);

app.get("/users", (_req: any, res: any) => {
  res.status(200).json(demoData.users);
});

app.get("/users/:id", (req: any, res: any) => {
  const idx = Number(req.params.id);
  for (const user of demoData.users) {
    if (user.id === idx) {
      res.status(200).json(user);
    }
  }
  res.status(400).json({ msg: "User not found" });
});

app.listen(port, () => {
  console.log(`Listening on ${port} ...`);
});

// https://deno-auth-a-50.deno.dev/users
