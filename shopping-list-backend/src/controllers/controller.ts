import { model as mongooseModel } from "mongoose";
import { Request, Response } from "express";
import List from "../models/ListSchema";

mongooseModel("list");

export const getAllLists = (req: Request, res: Response) => {
  try {
    mongooseModel(req.params.collection)
      .find()
      .then(item => {
        res.json(item);
      });
  } catch (e) {
    res.status(404).json("Could not find collection: " + req.params.collection);
  }
};

export const getOneListAndUpdate = (req: Request, res: Response) => {
  mongooseModel(req.params.collection)
    .findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          name: req.body.name,
          quantity: req.body.quantity,
          category: req.body.category
        }
      },
      { new: true }
    )
    .then(item => {
      res.json(item);
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

export const getOneItemAndUpdate = (req: Request, res: Response) => {
  mongooseModel(req.params.collection)
    .findOneAndUpdate(
      { _id: req.params.listId, "listItems._id": req.params.itemId },
      {
        $set: {
          "listItems.$.name": req.body.name,
          "listItems.$.quantity": req.body.quantity,
          "listItems.$.category": req.body.category
        }
      },
      { new: true }
    )
    .then(item => {
      res.json(item);
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

export const addOneList = (req: Request, res: Response) => {
  mongooseModel(req.params.collection)
    .create(new List(req.body))
    .then(item => {
      res.json(item);
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

export const addOneItemToList = (req: Request, res: Response) => {
  mongooseModel(req.params.collection)
    .findOneAndUpdate(
      { _id: req.params.listId },
      { $push: { listItems: req.body } },
      { new: true }
    )
    .then(item => {
      res.json(item);
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

export const deleteOneList = (req: Request, res: Response) => {
  mongooseModel(req.params.collection)
    .deleteOne({ _id: req.params.id })
    .then(item => {
      item.n > 0 ? res.json(item) : res.json("No matches.");
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

export const deleteOneItemFromList = (req: Request, res: Response) => {
  mongooseModel(req.params.collection)
    .updateOne(
      { _id: req.params.listId },
      { $pull: { listItems: { _id: req.params.itemId } } }
    )
    .then(item => {
      item.n > 0 ? res.json(item) : res.json("No matches.");
    })
    .catch(err => {
      res.status(500).json(err);
    });
};
