import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[]=[];
  currentCategoryId: number=1;
  previousCategory: number=1;
  searchMode: boolean=false;

  // new properties for pagination
  thePageNumber:number=1;
  thePageSize:number=5;
  theTotalElements:number=0;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) {

     }

  ngOnInit(){
    this.route.paramMap.subscribe(() => {
    this.listProducts();
  });
  }

  listProducts(){
    
    this.searchMode=this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode){

      this.handleSearchProducts();
    }
    else{
    this.handleListProducts();
  }

  }

  handleSearchProducts() {

    const theKeyword: string=this.route.snapshot.paramMap.get('keyword')!;
    
    // now search for products using keyword
    this.productService.searchProducts(theKeyword).subscribe(
      (      data: Product[])=>{
        this.products=data;
      }

    );

  }

  handleListProducts(){

  // check if "id" parameter is available
  const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

  if(hasCategoryId){

// get the "id" param and convert it to the number using the "+"
  this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
 }
 else{
   // not category id available ... sefault to category id 1
   this.currentCategoryId=1;
 }

//
 //Check if we have a different category then previous
 // Note: Angular will reuse a component if it is curently being viewed
 //

// if we have diferent category id then previous
// then set the PageNumber back to 1

if( this.previousCategory != this.currentCategoryId){
  this.thePageNumber=1; 
}

this.previousCategory=this.currentCategoryId;

console.log(`currentCategoryId=${this.currentCategoryId},
thePageNumber=${this.thePageNumber}`);



 // now get the product for the given category id
 this.productService.getProductListPaginate(this.thePageNumber - 1,
                                            this.thePageSize,
                                            this.currentCategoryId)
                                            .subscribe(this.processResult());
                                          
 

  }
processResult() {
  return (data: any) => {
    this.products=data._embedded.products;
    this.thePageNumber=data.page.number+1;
    this.thePageSize = data.page.size;
    this.theTotalElements = data.page.totalElements;
  };
}

updatePageSize(pageSize: number){
this.thePageSize=pageSize;
this.thePageNumber=1;
this.listProducts();

}

}
