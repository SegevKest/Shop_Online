import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShopService } from 'src/app/services/shop.service';
import { CartProduct } from 'src/models/CartProduct';
import { Router } from '@angular/router';

// import openSocket from 'socket.io-client';
// const socket = openSocket('http://localhost:3008');


@Component({
  selector: 'app-sidebar-cart',
  templateUrl: './sidebar-cart.component.html',
  styleUrls: ['./sidebar-cart.component.css']
})
export class SidebarCartComponent implements OnInit, OnDestroy {

  allProducts: CartProduct[];
  totalCartPrice: Number;
  minTrigger = false;
  locationFlag = this.router.isActive('/shop', true);

  constructor(private shop: ShopService, private router: Router) { }

  ngOnInit() {
    if (this.shop.cart) {
      this.getCartProducts();
      this.getTotalPrice();
    }
    this.shop.userTrigger.subscribe( () => {
      this.getCartProducts();
      this.getTotalPrice();
    });

    // Search In Cart : almost done, didnt had enough time !
    
    // this.shop.searchInCartTrigger.subscribe( (word) => {
    //   this.allProducts.map( (product, index) => {
    //     if (product.productName.includes(word)) {

    //     }
    //   })
    // });
  }

  getCartProducts() {
    this.shop.getAllCartProducts(this.shop.cart.id).subscribe(data => this.allProducts = data );
  }
  getTotalPrice() {
    this.shop.getCartPrice().subscribe( data => this.totalCartPrice = data);
  }
  ngOnDestroy() {
  }

  changeTrigger() {
    this.minTrigger = ! this.minTrigger ;
  }
}
