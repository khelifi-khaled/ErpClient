import { vatType } from "./vatType.models";

export interface Item {
    id: string,
    vatType : vatType,
    supplierItemNumber : string,
    itemBarcode : string,
    itemNumber : string,
    itemDiscription : string,
    itemPrice : number
}