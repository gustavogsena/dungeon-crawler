import { model } from "mongoose";
import { IItem, itemsSchema } from "./items.schema";

export const Item = model<IItem>('Item', itemsSchema)