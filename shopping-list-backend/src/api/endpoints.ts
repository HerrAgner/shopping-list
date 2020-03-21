import { Router, Request, Response } from "express";

import {
  getAllLists,
  getOneItemAndUpdate,
  getOneListAndUpdate,
  addOneList,
  addOneItemToList,
  deleteOneItemFromList,
  deleteOneList
} from "../controllers/controller";

const router = Router();
router.get("/api/:collection", (req: Request, res: Response) =>
  getAllLists(req, res)
);
router.put("/api/:collection/:id", (req: Request, res: Response) =>
  getOneListAndUpdate(req, res)
);
router.put("/api/:collection/:listId/:itemId", (req: Request, res: Response) =>
  getOneItemAndUpdate(req, res)
);
router.post("/api/:collection", (req: Request, res: Response) =>
  addOneList(req, res)
);
router.post("/api/:collection/:listId", (req: Request, res: Response) =>
  addOneItemToList(req, res)
);
router.delete("/api/:collection/:id", (req: Request, res: Response) =>
  deleteOneList(req, res)
);
router.delete(
  "/api/:collection/:listId/:itemId",
  (req: Request, res: Response) => deleteOneItemFromList(req, res)
);

export default router;
