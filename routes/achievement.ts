import { json, NextFunction, Request, Response, Router } from "express";
import pug from "pug";
import Achievement from "../models/achievement";

const router = Router();

// create API
router.post(
  "/create",
  json(),
  async (req: Request, res: Response, next: NextFunction) => {
    const { date, title, description } = req.body;

    const achievement = await Achievement.create({ date, title, description });

    res.send(`created achievement: ${JSON.stringify(achievement.dataValues)}`);
  }
);

// list (read) API
router.get("/list", async (req: Request, res: Response, next: NextFunction) => {
  const achievements = await Achievement.findAll({ raw: true });
  console.log({ achievements });
  const html = pug.renderFile("./templates/list-achievement.pug", {
    achievements,
  });
  res.send(html);
});

// detail (read) API
router.get(
  "/:achievement_id/detail",
  async (req: Request, res: Response, next: NextFunction) => {
    const id: number = parseInt(req.params.achievement_id);
    const achievement = await Achievement.findByPk(id);
    res.send(achievement);
  }
);

// update API
router.post(
  "/:achievement_id/update",
  json(),
  async (req: Request, res: Response, next: NextFunction) => {
    const id: number = parseInt(req.params.achievement_id);
    const achievement = await Achievement.findByPk(id);
    await achievement?.update({
      date: req.body.date as Date,
      title: req.body.title as string,
      description: req.body.description as string,
    });

    res.send(achievement);
  }
);

// delete API
router.delete(
  "/:achievement_id/delete",
  async (req: Request, res: Response, next: NextFunction) => {
    const id: number = parseInt(req.params.achievement_id);
    const achievement = await Achievement.findByPk(id);
    await achievement?.destroy();
    res.send(`delete successful ID: ${id}`);
  }
);

export default router;
