import { NextFunction, Request, Response, Router } from "express";
import pug from "pug";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send(pug.renderFile("./templates/profile.pug"));
});

export default router;
