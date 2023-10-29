export class Product {
    constructor(public sku:string,public name:string,public description:string,
        public unitPrice:number,public imageUrl:string,public active:string,
        public unitsInStock:number,public date_Created:Date,public last_Updated:Date){

    }
}
