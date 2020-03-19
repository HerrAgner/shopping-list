import * as express from "express";
import {Request, Response} from 'express';

import * as controller from "../controllers/controller";

const router = express.Router()
router.get("/api/:collection", (req: Request, res: Response) => controller.getAllLists(req,res));
router.put("/api/:collection/:id", (req: Request, res: Response) => controller.getOneListAndUpdate(req, res));
router.put("/api/:collection/:listId/:itemId", (req: Request, res: Response) => controller.getOneItemAndUpdate(req, res));
router.post("/api/:collection", (req: Request, res: Response) => controller.addOneList(req, res));
router.post("/api/:collection/:listId", (req: Request, res: Response) => controller.addOneItemToList(req, res));
router.delete("/api/:collection/:id", (req: Request, res: Response) => controller.deleteOneList(req, res));
router.delete("/api/:collection/:listId/:itemId", (req: Request, res: Response) => controller.deleteOneItemFromList(req, res));

export default router;


