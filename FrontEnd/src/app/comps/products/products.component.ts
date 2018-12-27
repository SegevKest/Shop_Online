import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShopService } from 'src/app/services/shop.service';
import { Catagory } from 'src/models/Catagory';
import { Product } from 'src/models/Product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  allCatagories: Catagory[];
  catagoryProducts: Product[];
  searchTerm: string;
  errMsg: string;

  constructor(public shop: ShopService, private router: Router) { }

  ngOnInit() {
    this.shop.getAllCatagories().subscribe( data =>  this.allCatagories = data );
  }

  getProductsOfCatagory(e) {
    this.catagoryProducts = [];
    const catagoryName = e.target.innerText;
    const searchTerm = catagoryName.substring(3, 7);
    this.shop.getCatagoryProducts(searchTerm).subscribe( data =>  this.catagoryProducts = data );
  }

  getSearchedProducts() {
    this.catagoryProducts = [];
    const search = this.searchTerm;
      this.shop.searchProduct(search).subscribe( data => {
        if (data[0] && data.length > 0) {
          this.catagoryProducts.push(data[0]);
        } else {
          this.catagoryProducts = null;
        }
      });
  }

  SearchOnType () {
    if (this.router.isActive('cashier', true)) {
      const search = this.searchTerm;
      this.shop.searchInCart(search);
    }
  }
}
