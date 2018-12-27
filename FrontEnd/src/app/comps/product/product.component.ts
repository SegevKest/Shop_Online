import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/models/Product';
import { Router } from '@angular/router';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() theProduct: Product;
  showOrderModal = false;

  constructor(private router: Router, private shop: ShopService) { }

  isAdminUser = this.router.isActive('/admin', true);

  ngOnInit() {
  }

  passProduct () {
    if  (this.isAdminUser) {
      this.shop.receiveSelected(this.theProduct);
    }
  }

  toggleOrder(): void {
    if (this.theProduct !== null ) {
      this.showOrderModal = ! this.showOrderModal;
    }
  }
}
