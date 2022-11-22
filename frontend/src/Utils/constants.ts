import { IMessage } from "./methods"

export const MESSAGE_LOGIN: IMessage = {
  icon: "error",
  title: "...Oops",
  text: "Username or password didn't match"
}

export const MESSAGE_ADDTOCART: IMessage = {
  icon: "success",
  title: "Added",
  text: "Item has been added"
}

export const HEADERS: any = { 'Content-Type': 'application/json' }
export const IMAGE_HEADERS: any = {
  'Content-Type': 'multipart/form-data',
  "Access-Control-Allow-Origin": "*"
}
export const DEFAULT_COLOR: string = "rgb(0, 90, 158)"
export const ORDER_LIST_KEY: string = 'shoppingList'
export const PERSON_KEY: string = 'person'
export const FAVORITE_ITEMS_LIST_KEY: string = 'favorite'
export const ASCENDING: string = 'Ascending'
export const DESCENDING: string = 'Descending'