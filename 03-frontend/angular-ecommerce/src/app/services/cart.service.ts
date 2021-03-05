import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[]=[];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number>=new Subject<number>();

  constructor() {  }

  addToCart(theCartItem: CartItem){
  // check if we already hava the item in the cart
let alreadyExistingCart: boolean= false;
let existingCartItem: CartItem= undefined;

if (this.cartItems.length>0){
  // find the item in the cart hased on item id

  for(let tempCartItem of this.cartItems){

    if (tempCartItem.id===theCartItem.id){
      existingCartItem=tempCartItem;
      break;
    }
  }


  // check if we found it
alreadyExistingCart=(existingCartItem !=undefined);
}

if(alreadyExistingCart){
//increment the quantity
existingCartItem.quantity++;
}
else{
  // just add item to the array
  this.cartItems.push(theCartItem);
}

// compute cart total price and total quality
this.computeCartTotals();

}
  computeCartTotals() {
    throw new Error('Method not implemented.');
  }

}

