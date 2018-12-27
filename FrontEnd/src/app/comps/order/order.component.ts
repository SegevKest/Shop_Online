import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ShopService } from 'src/app/services/shop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderForm: FormGroup;
  errorMsg = '';
  totalCartPrice: Number;
  orderDone = false;
  downloadUrl: string;
  constructor(private formBuild: FormBuilder,
              private shop: ShopService,
              private router: Router    ) { }

  ngOnInit() {
    /*
    Credit Card Regex :
                    Validators.pattern(`[^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|
                            6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|
                            [68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$]`)
    */
    this.orderForm = this.formBuild.group({
      city: ['', [Validators.required]],
      street: ['', [Validators.required]],
      shippingDate: ['', [Validators.required]],
      payment: ['', [ Validators.required, Validators.minLength(16), Validators.maxLength(16) ]]
    });
    this.getTotalPrice();
    // this.makeDownloadUrl();
  }

  autoFillForm() {
    this.orderForm.patchValue(this.shop.currUser);
  }

  getTotalPrice() {
    this.shop.getCartPrice().subscribe( data => this.totalCartPrice = data);
  }

  checkShippingDate() {
    const shipDate = this.orderForm.value.shippingDate;
    this.shop.checkAvailableDate(shipDate).subscribe( data => {
      if (! data) {
        this.errorMsg = `This Shipping Date is Full, select another date `;
      }
    });
  }

  OrderCart() {
    this.orderDone = true;
    const orderObj = {  id: this.shop.cart.id,
                        userId: this.shop.currUser.id,
                        cartId: this.shop.cart.id,
                        orderDate: new Date().toISOString().split('T')[0],
                        dateToDeliever: null,
                        creditCard: '',
                        city: '',
                        street: '',
                        finalPrice: this.totalCartPrice,
                        status: 'Ordered'
                      };
    if (this.orderForm.valid) {
      orderObj.street = this.orderForm.value.street;
      orderObj.city = this.orderForm.value.city;
      orderObj.dateToDeliever = this.orderForm.value.shippingDate;
      orderObj.creditCard = this.orderForm.value.payment;

      this.shop.newOrder(orderObj).subscribe(data => {
        this.shop.deleteCartAfterOrder().subscribe( deleted => this.shop.userActions());
      });
    }
  }

  // The functions below are try to download the reciepts, it only downloads it as text.
  makeDownloadUrl() {
    this.shop.downloadReciept().subscribe(data => this.downloadUrl = data);

  }

  downloadFile(data: any) {
    const blob = new Blob([ data ], { type: 'text/plain' });
    console.log(blob);
    this.downloadUrl = window.URL.createObjectURL(blob);
    console.log(this.downloadUrl);
  }


}
