import { PayementTerm } from "./PayementTerm.models";
import { Address } from "./address.models";
import { Category } from "./category.models";

export interface Customer {
    id : string,
    customerCategory : Category,
    customerPayementTerm : PayementTerm,
    customerNumber : number,
    customerName : string,
    customerPhoneNumber : string,
    customerFaxNumber : string,
    customerEmail : string,
    customerVatNumber : string,
    registeredVat : boolean
    address : Address
}