import Jsonata from "./backend.json"
import {
  LOGIN_PATH,
  HTTP_PATH,
  ADD_USER_PATH,
  ADD_DETAIL_PATH,
  ADD_MONEY_PATH_NAME,
  GET_DETAIL_BY_NAME,
  GET_DETAIL_BY_SUBNAME,
  DELETE_BY_SUBNAME,
  TOTAL_COLLECTION,
  ADD_TODAY_COLLECTION
} from "./contstant";
export function LoginPath() {
    return HTTP_PATH+Jsonata.Host+":"+Jsonata.Port+LOGIN_PATH
}

export  function AddUserPath() {
    return HTTP_PATH + Jsonata.Host + ":" + Jsonata.Port + ADD_USER_PATH;
}

export function AddDetailPath() {
    return HTTP_PATH + Jsonata.Host + ":" + Jsonata.Port + ADD_DETAIL_PATH;
}

export function AddPathByName() {
    return HTTP_PATH + Jsonata.Host + ":" + Jsonata.Port + ADD_MONEY_PATH_NAME;
}

export function GetDetailByName(name) {
  var path =  `${HTTP_PATH}${Jsonata.Host}:${Jsonata.Port}${GET_DETAIL_BY_NAME}/`;
  path = path + name
  return path
}

export function GetDetailBySubName(subName) {
  var path = `${HTTP_PATH}${Jsonata.Host}:${Jsonata.Port}${GET_DETAIL_BY_SUBNAME}/`;
  path = path + subName;
  return path;
}

export function PathToDeleteBySubName(subName) {
  var path = `${HTTP_PATH}${Jsonata.Host}:${Jsonata.Port}${DELETE_BY_SUBNAME}/`;
  path = path + subName;
  return path
}

export function TotalCollectionPath() {
  var path = `${HTTP_PATH}${Jsonata.Host}:${Jsonata.Port}${TOTAL_COLLECTION}`;
  return path
}

export function PathToAddTodayCollection() {
  var path = `${HTTP_PATH}${Jsonata.Host}:${Jsonata.Port}${ADD_TODAY_COLLECTION}`;
  return path;
}

