import { NextFunction, Request, Response, Router } from "express";
import pug from "pug";
import Achievement from "../models/achievement";

const router = Router();

const projects = [
  {
    name: "CFW",
    detail: "A management system for a wholesale platform in Thailand.",
  },
  {
    name: "Janus Finance",
    detail:
      "A token gateway allow user to swap token, manage portfolio and look for top DEFI protocol",
  },
  {
    name: "Giigle",
    detail:
      "A url shortener website that clone bit.ly and enhance it with more features",
  },
];

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const achievements = await Achievement.findAll({ raw: true });
  res.send(
    pug.renderFile("./templates/profile.pug", { achievements, projects })
  );
});

export default router;
