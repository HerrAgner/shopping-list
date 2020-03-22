import axios from "axios";
import {list, listItem} from "../interfaces/list";

const baseUrl = "http://localhost:3001/api/";

const getAllLists = async (collection: string) => {
  let url = baseUrl + collection;
  const request = axios.get(url);
  let response = await request;
  return response.data;
};

const createList = async (
  newObject: list,
  collection: string
) => {
  let url = baseUrl + collection;
  const request = axios.post(url, newObject);
  let response = await request;
  return response.data;
};

const addItemToList = async (
  newObject: listItem,
  listId: string,
  collection: string
) => {
  let url = baseUrl + collection + "/" + listId;
  const request = axios.post(url, newObject);
  let response = await request;
  return response.data;
};

const deleteList = async (id: string, collection: string) => {
  let url = baseUrl + collection;
  const request = axios.delete(`${url}/${id}`);
  let response = await request;
  return response.data;
};

const deleteListItem = async (
  listId: string,
  itemId: string,
  collection: string
) => {
  let url = baseUrl + collection;
  const request = axios.delete(`${url}/${listId}/${itemId}`);
  let response = await request;
  return response.data;
};

const editListItem = async (
  listId: string,
  itemId: string,
  newItem: listItem,
  collection: string
) => {
  let url = baseUrl + collection;
  const request = axios.put(`${url}/${listId}/${itemId}`, newItem);
  let response = await request;
  return response.data;
};

export default {
  getAllLists,
  createList,
  deleteList,
  addItemToList,
  editListItem,
  deleteListItem
};
