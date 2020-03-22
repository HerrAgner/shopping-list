import React, { useEffect, useState } from "react";
import InputForm from "./InputForm";
import {
  Container,
  Grid,
  Hidden,
  IconButton,
  List,
  makeStyles,
  Typography
} from "@material-ui/core";
import { list, listItem } from "../interfaces/list";
import { ListItem } from "./ListItem";
import DeleteIcon from "@material-ui/icons/Delete";
import mongoApi from "../api/mongoApi";
import { ObjectId } from "bson";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    padding: "2vw"
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  grid: {
    display: "flex"
  },
  listHeader: {
    display: "flex",
    backgroundColor: "lightgray",
    justifyContent: "center"
  },
  listTitle: {
    alignSelf: "center"
  }
}));

const ShoppingList = () => {
  const classes = useStyles();
  const [lists, setLists] = useState<list[]>([]);

  useEffect(() => {
    mongoApi.getAllLists("list").then(res => setLists(res));
  }, []);

  const deleteList = (listId: string) => {
    if (listId)
      mongoApi
        .deleteList(listId, "list")
        .then(res =>
          setLists(lists.filter((list: list) => list._id !== listId))
        );
  };

  const deleteItem = (listId: string, itemId: string, listIndex: number) => {
    mongoApi.deleteListItem(listId, itemId, "list").then(res => {
      setLists((prevLists: list[]) => {
        return prevLists.map((list: list, idx: number) => {
          if (listIndex === idx) {
            return {
              ...prevLists[listIndex],
              listItems: [
                ...prevLists[listIndex].listItems.filter(
                  (item: listItem) => item._id !== itemId
                )
              ]
            };
          } else {
            return list;
          }
        });
      });
    });
  };

  const addItem = (newItem: listItem, listId: string, listIndex: number) => {
    mongoApi.addItemToList(newItem, listId, "list").then(res => {
      setLists((prevLists: list[]) => {
        return prevLists.map((list: list, idx: number) => {
          if (listIndex === idx) {
            return {
              ...prevLists[listIndex],
              listItems: [...prevLists[listIndex].listItems, newItem]
            };
          } else {
            return list;
          }
        });
      });
    });
  };

  const editItem = (
    listId: string,
    itemId: string,
    newItem: listItem,
    listIndex: number
  ) => {
    mongoApi.editListItem(listId, itemId, newItem, "list").then(res => {
      setLists((prevLists: list[]) => {
        return prevLists.map((list: list, idx: number) => {
          if (listIndex === idx) {
            return {
              ...prevLists[listIndex],
              listItems: [
                ...prevLists[listIndex].listItems.map((item: listItem) => {
                  return item._id === itemId ? { ...newItem } : item;
                })
              ]
            };
          } else {
            return list;
          }
        });
      });
    });
  };

  const addList = (newListName: string) => {
    let newList = { _id: new ObjectId().toString(), listName: newListName, listItems: [] }


    if (newListName)
      mongoApi.createList(newList, "list").then(res => {
        setLists([
          ...lists,
          newList
        ]);
      });
  };

  return (
    <Container className={classes.root}>
      <Grid item md={6} className={classes.grid}>
        <Grid item md={2} implementation="css" component={Hidden} />
        <Grid item md={8}>
          <InputForm lists={lists} addList={addList} addItem={addItem} />
        </Grid>
      </Grid>

      <Grid item md={6}>
        {lists.map((list: list, listIndex: number) => {
          return (
            <div key={list._id}>
              <div className={classes.listHeader}>
                <Typography variant="h6" className={classes.listTitle}>
                  {list.listName}
                </Typography>
                <IconButton onClick={e => deleteList(list._id!)} edge="end">
                  <DeleteIcon />
                </IconButton>
              </div>
              <div>
                <List dense={true}>
                  {list.listItems.map(listItem => {
                    return (
                      <ListItem
                        listId={list._id}
                        listIndex={listIndex}
                        listItem={listItem}
                        key={listItem._id}
                        deleteItem={deleteItem}
                        editItem={editItem}
                      />
                    );
                  })}
                </List>
              </div>
            </div>
          );
        })}
      </Grid>
    </Container>
  );
};

export default ShoppingList;
