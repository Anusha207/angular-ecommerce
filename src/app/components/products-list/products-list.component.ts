import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list-grid.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products!: Product[];
  currentCategoryId!: number;
  // searchMode!:boolean;
  searchMode :boolean =false;

  constructor(private productservice:ProductService,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{

   
    this.listproducts();
  });
    }
    listproducts(){
      this.searchMode=this.route.snapshot.paramMap.has('keyword');
      if(this.searchMode){
        this.handleSearchProducts();
      }else{
      this.handleListProducts();
      }
    }
    handleSearchProducts(){
      const theKeyword:string=this.route.snapshot.paramMap.get('keyword')!;
      //now search the products using given keyword
      this.productservice.searchProducts(theKeyword).subscribe(
        data =>{
          this.products=data;
        }
      )

    }
   

    handleListProducts(){

         //check  if id parameter is available
         const hasCategoryId:boolean=this.route.snapshot.paramMap.has("id");
         if(hasCategoryId){
           //get the "id" paramstring.convert string to a numberusing the + symbol
           this.currentCategoryId=+ this.route.snapshot.paramMap.get("id")!;
         }
         else{
           //not category id availbale..deafult to category id 1
           this.currentCategoryId=1;
   
         }
         //now get the products for the given category id
         this.productservice.getProductList(this.currentCategoryId).subscribe(
           data=>{
             this.products=data;
           }
         )
         
         
       
    }

}
