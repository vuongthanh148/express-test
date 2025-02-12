import { json, NextFunction, Request, Response, Router } from "express";
import pug from "pug";
import { Prophecy, Prophet } from "../models";

const router = Router();

// create API
router.post(
  "/create",
  json(),
  async (req: Request, res: Response, next: NextFunction) => {
    // change from req.query to req.body
    const { title, description } = req.body;

    // await can only be used here if the
    // wrapping function is async. You can
    // manually handle the Promise otherwise.
    const prophecy = await Prophecy.create({ title, description });

    res.send(`create successful ID: ${prophecy.id}`);
  }
);

// list (read) API
router.get("/list", async (req: Request, res: Response, next: NextFunction) => {
  const prophecies = await Prophecy.findAll({ raw: true });
  const html = pug.renderFile("./templates/list.pug", { prophecies });
  res.send(html);
});

// detail (read) API
router.get(
  "/:prophecy_id/detail",
  async (req: Request, res: Response, next: NextFunction) => {
    const id: number = parseInt(req.params.prophecy_id);
    const prophecy = await Prophecy.findByPk(id, {
      // sequelize will automagically map the
      // the correct prophet to the prophecy based
      // on the foreign key we have defined.
      include: [Prophet],
    });
    res.send(prophecy);
  }
);

// update API
router.post(
  "/:prophecy_id/update",
  json(),
  async (req: Request, res: Response, next: NextFunction) => {
    const id: number = parseInt(req.params.prophecy_id);
    const prophecy = await Prophecy.findByPk(id);
    await prophecy?.update({
      title: req.body.title as string,
      description: req.body.description as string,
    });

    res.send(prophecy);
  }
);

// delete API
router.delete(
  "/:prophecy_id/delete",
  async (req: Request, res: Response, next: NextFunction) => {
    const id: number = parseInt(req.params.prophecy_id);
    const prophecy = await Prophecy.findByPk(id);
    await prophecy?.destroy();
    res.send(`delete successful ID: ${id}`);
  }
);

export default router;
