import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from 'src/models/Product';
import { ShopService } from 'src/app/services/shop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product-to-cart',
  templateUrl: './add-product-to-cart.component.html',
  styleUrls: ['./add-product-to-cart.component.css']
})
export class AddProductToCartComponent implements OnInit {

  addProductForm: FormGroup;
  @Input() productDetails: Product;


  constructor(private shop: ShopService ) { }

  ngOnInit() {
    this.buildModalForm();
  }

  private buildModalForm() {
    this.addProductForm = new FormGroup({
      productName : new FormControl(``, [Validators.required]),
      amount: new FormControl(``, [Validators.required])
     } );
  }

  orderProduct() {
    const totalPrice = this.productDetails.price * this.addProductForm.value.amount;
    const orderProduct = {
                    cartId: this.shop.cart.id,
                    productId: this.productDetails.id,
                    productName: this.productDetails.name,
                    amount : this.addProductForm.value.amount,
                    totalPrice: totalPrice
                  };
    this.shop.addCartProduct(orderProduct).subscribe(data =>  this.shop.userActions());
  }


}
