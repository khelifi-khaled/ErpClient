import { Item } from "./item.models"

export interface InvoiceItem {
    id: number
    quantity: number
    price: number
    purchcasePrice: number
    discount: number
    item: Item
  }