import { Customer } from "./customer.models";
import { InvoiceItem } from "./invoiceItem.models";

export interface Invoice{
    id : string,
    customer : Customer,
    invoiceDate : Date,
    invoiceDueDate : Date,
    invoiceNumber : number,
    totalAmountExcVat : number,
    totalVatAmount : number,
    flagAccounting : boolean,
    invoiceItems : InvoiceItem[]
}