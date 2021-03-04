import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private baseUrl='http://localhost:8080/api/products';
  private categoryUrl='http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }


  getProductListPaginate(thePage:number,
                          thePageSize:number,
                          theCategoryId:number):
                          Observable<GetResponseProducts>{

    // need to build URL based on category id,page and size

    const searchUrl= `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                    + `&page=${thePage}&size=${thePageSize}`;


  //  const newLocal = this.getProducts(searchUrl);
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getProductList(theCategoryId:number): Observable<Product[]>{

    // need to build URL based on category id

    const searchUrl= `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;


  //  const newLocal = this.getProducts(searchUrl);
    return this.getProducts(searchUrl);
  }



  getProductCategories(): Observable<ProductCategory[]> {

    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response =>response._embedded.productCategory)
    );
  }



searchProducts(theKeyword: string): Observable<Product[]> {

     // need to build URL based on category id
     const searchUrl= `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;


    return this.getProducts(searchUrl);

}

searchProductsPaginate(thePage:number,
                      thePageSize:number,
                      theKeyword:string):
                      Observable<GetResponseProducts>{

  // need to build URL based on category id,page and size

  const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
                  + `&page=${thePage}&size=${thePageSize}`;


  //  const newLocal = this.getProducts(searchUrl);
  return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

private getProducts(searchUrl: string) {
  return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
    map(response => response._embedded.products)
  );
}

getProduct(theProductId: number): Observable<Product> {

// need to build URL base on product id

const productUrl=`${this.baseUrl}/${theProductId}`;

return this.httpClient.get<Product>(productUrl);
}

}
interface GetResponseProducts{
  _embedded:{
    products: Product[];
  },
page:{
size:number,
totalElements:number,
totalPages:number,
number: number
}

}

interface GetResponseProductCategory{
  _embedded:{
    productCategory: ProductCategory[];
  }
}
