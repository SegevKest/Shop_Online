import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginUser } from 'src/models/User';
import { ShopService } from 'src/app/services/shop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  totalProducts: number;
  totalOrders: number;

  constructor(public shop: ShopService,
              private router: Router) {}

  ngOnInit() {
    this.createLogin();
  }

  private async createLogin() {

    this.loginForm = new FormGroup({
      email: new FormControl('' , [Validators.required, Validators.email]),
      password: new FormControl('' , Validators.required)
    });
    await this.getProducts();
    await this.getOrders();

  }

  logIn(): void {
    if (this.loginForm.invalid) { return; }
    this.shop.login(this.loginForm.value);
  }

  getProducts(): void {
    this.shop.getAllProducts().subscribe( data =>
      this.totalProducts = typeof data === 'number' ?  data :  0 );
  }

  getOrders(): void {
    this.shop.getAllOrders().subscribe( data =>
       typeof data === 'number' ? this.totalOrders = data : this.totalOrders = 0 );
  }

}
