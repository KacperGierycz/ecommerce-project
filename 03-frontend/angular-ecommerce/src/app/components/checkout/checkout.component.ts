import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Luv2ShopFormService } from 'src/app/services/luv2-shop-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears:number[]=[];
  creditCardMonths:number[]=[];


  constructor(private formBuilder: FormBuilder,
              private luv2shopFormService:Luv2ShopFormService) { }

  ngOnInit(): void {

    this.checkoutFormGroup=this.formBuilder.group({
      customer:this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        street:[''],
        city:[''],
        state:[''],
        country:[''],
        email:[''],
        zipCode:[''],

      }),
      billingAddress: this.formBuilder.group({
        street:[''],
        city:[''],
        state:[''],
        country:[''],
        email:[''],
        zipCode:[''],

      }),
      creditCard: this.formBuilder.group({
        cardType:[''],
        nameOnCard:[''],
        cardNumber:[''],
        securityCode:[''],
        expirationMonth:[''],
        expirationYear:[''],

      })

    });

    // populate credit cards months

    const startMonth: number= new Date().getMonth()+1;
    console.log("startMonth"+startMonth);

    this.luv2shopFormService.getCreditCardMonths(startMonth).subscribe(
      data=>{
        console.log("Retrived credit card months: "+ JSON.stringify(data));
        this.creditCardMonths=data;
      }
    )

    // populated credit cards years



      this.luv2shopFormService.getCreditCardYears().subscribe(
        data=>{
          console.log("Retrieve Credit Card Year: "+ JSON.stringify(data));
          this.creditCardYears=data;
        }
      )

  }

  onSubmit(){

    console.log("Handling the submit button");
    console.log(this.checkoutFormGroup.get('customer').value);
    console.log("email is: "+ this.checkoutFormGroup.get('customer').value.email);
  }

  copyShippingAddressToBillingAddress(event){
    if(event.target.checked){
      this.checkoutFormGroup.controls.billingAddress
        .setValue(this.checkoutFormGroup.controls.shippingAddress.value)
    }
    else{
      this.checkoutFormGroup.controls.billingAddress.reset();
    }
  }

}
