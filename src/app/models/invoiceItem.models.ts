import { Item } from "./item.models"

export interface InvoiceItem {
    quantity: number
    price: number
    purchcasePrice: number
    discount: number
    item: Item
  }