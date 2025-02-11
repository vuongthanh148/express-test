import { NextFunction, Request, Response, Router } from "express";
import pug from "pug";

// type declaration for our Prophecies
type Prophecy = {
  id: number;
  title: string;
  description: string;
};

// state
// state
const prophecies: Prophecy[] = [
  {
    id: 1,
    title: "Grow Buildings",
    description: "Building will be grown from genetically modified seeds.",
  },
  {
    id: 2,
    title: "Mind Interface",
    description:
      "Humans will one day directly interface computers with thought.",
  },
];

const router = Router();
let prophecy_indexer = 0;

// create API
router.post("/create", (req: Request, res: Response, next: NextFunction) => {
  const { title, description } = req.query;

  // increase ID as we add more
  const id = ++prophecy_indexer;
  prophecies.push({
    id,
    title: title as string,
    description: description as string,
  });

  res.send(`create successful ID: ${id}`);
});

// list (read) API
router.get("/list", (req: Request, res: Response, next: NextFunction) => {
  const html = pug.renderFile("./templates/list.pug", { prophecies });
  res.send(html);
});

// detail (read) API
router.get(
  "/:prophecy_id/detail",
  (req: Request, res: Response, next: NextFunction) => {
    const id: number = parseInt(req.params.prophecy_id);
    const prophecy = prophecies.find((item) => item.id === id);
    res.send(prophecy);
  }
);

// update API
router.post(
  "/:prophecy_id/update",
  (req: Request, res: Response, next: NextFunction) => {
    const id: number = parseInt(req.params.prophecy_id);
    const prophecy = prophecies.find((item) => item.id === id);
    console.log({ prophecy });
    if (prophecy) {
      prophecy.title = req.query.title as string;
      prophecy.description = req.query.description as string;
      res.send(prophecy);
    } else {
      res.status(404).send("Prophecy not found");
    }
  }
);
// delete API
router.delete(
  "/:prophecy_id/delete",
  (req: Request, res: Response, next: NextFunction) => {
    const id: number = parseInt(req.params.prophecy_id);
    const prophecy = prophecies.find((item) => item.id === id);
    console.log({ prophecy });
    if (prophecy) {
      const index: number = prophecies.indexOf(prophecy);
      prophecies.splice(index, 1);
      res.status(200).send("Success");
    } else {
      res.status(404).send("Prophecy not found");
    }
  }
);
export default router;
