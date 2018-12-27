import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/models/Product';
import { ShopService } from 'src/app/services/shop.service';
import { CartProduct } from 'src/models/CartProduct';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-product',
  templateUrl: './sidebar-product.component.html',
  styleUrls: ['./sidebar-product.component.css']
})
export class SidebarProductComponent implements OnInit {


  constructor(private shop: ShopService, private router: Router) { }

  locationFlag = this.router.isActive('/shop', true);
  @Input() sideBar_product: CartProduct;

  ngOnInit() {
  }

  deleteProduct(e) {
    this.shop.deleteProduct(this.sideBar_product.productId).subscribe( data => this.shop.userActions());
  }
}
