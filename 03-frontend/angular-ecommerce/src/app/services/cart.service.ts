import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  cartItems: CartItem[]=[];

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number>=new BehaviorSubject<number>(0);

  constructor() {  }

  addToCart(theCartItem: CartItem){
  // check if we already hava the item in the cart
let alreadyExistingCart: boolean= false;
let existingCartItem: CartItem= undefined;

if (this.cartItems.length>0){
  // find the item in the cart hased on item id

existingCartItem= this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id);


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
    let totalPriceValue: number = 0;
    let totalQuantityValue: number =0 ;

    for (let curentCartItem of this.cartItems){

      totalPriceValue += curentCartItem.quantity * curentCartItem.unitPrice;
      totalQuantityValue += curentCartItem.quantity;
    }

  // publish the new values ... all subscribes will recive the new data
  this.totalPrice.next(totalPriceValue);
  this.totalQuantity.next(totalQuantityValue);

// log cart data just for debugging purposes
this.logCartData(totalPriceValue, totalQuantityValue);

  }
  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Content of the cart');
    for (let tempCartItem of this.cartItems){
      const subTotalPrice=tempCartItem.quantity*tempCartItem.unitPrice;
      console.log(`name: ${tempCartItem.name}, quantity=${tempCartItem.quantity}, subTotalPrice=${subTotalPrice} `);
    }

    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
    console.log('-----');

  }

  decrementQuantity(theCartItem: CartItem) {

    theCartItem.quantity--;

    if (theCartItem.quantity === 0){
      this.remove(theCartItem);
      
    }
    else{

      this.computeCartTotals();
    }

  }

  remove(theCartItem: CartItem) {

    // get index of item in the array
    const itemIndex= this.cartItems.findIndex( tempCartItem =>tempCartItem.id === theCartItem.id);


    // if found remove the item from the array at a given index
    if( itemIndex > -1){
      this.cartItems.splice(itemIndex, 1);

      this.computeCartTotals();
    }

  }

}

