import axios from "axios";
import {listItem} from "../interfaces/list";

const baseUrl = "http://localhost:3001/api/";

const getAllLists = (collection: string) => {
    let url = baseUrl + collection;
    const request = axios.get(url);
    return request.then((response: any) => response.data);
};

const createList = (newObject: {listName: string}, collection: string) => {
    let url = baseUrl + collection;
    const request = axios.post(url, newObject);
    return request.then(response => response.data);
};

const addItemToList = (newObject: listItem, collection: string, listId: string) => {
    let url = baseUrl + collection+"/"+listId;
    const request = axios.post(url, newObject);
    return request.then(response => response.data);
};

const deleteList = (id: string, collection:string) => {
    let url = baseUrl + collection;
    const request = axios.delete(`${url}/${id}`);
    return request.then(response => response.data);
};

const deleteListItem = (listId: string, itemId: string, collection:string) => {
    let url = baseUrl + collection;
    const request = axios.delete(`${url}/${listId}/${itemId}`);
    return request.then(response => response.data);
};

const editListItem = (listId: string, itemId: string, newItem: listItem, collection:string) => {
    let url = baseUrl + collection;
    const request = axios.put(`${url}/${listId}/${itemId}`, newItem);
    return request.then(response => response.data);
};

export default {
    getAllLists,
    createList,
    deleteList,
    addItemToList,
    editListItem,
    deleteListItem
};
