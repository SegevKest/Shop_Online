import { Injectable, Input, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { User, LoginUser, RegisteredUser } from 'src/models/User';
import { ApiService } from './api.service';
import { Cart } from 'src/models/Cart';
import { Order } from 'src/models/Order';
import { CartProduct } from 'src/models/CartProduct';
import { Catagory } from 'src/models/Catagory';
import { Product } from 'src/models/Product';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  currUser: User;
  cart: Cart ;
  order: Order;
  loginMsg: string;

  // Events Emitters
  @Output() selectedProduct: EventEmitter<Product> = new EventEmitter();
  @Output() loggedIn: EventEmitter<string> = new EventEmitter();
  @Output() userTrigger: EventEmitter<string> = new EventEmitter();
  @Output() adminTrigger: EventEmitter<string> = new EventEmitter();
  @Output() searchInCartTrigger: EventEmitter<string> = new EventEmitter();

  constructor(private api: ApiService, private router: Router) {
    this.api.isUserLogged().subscribe(data =>  data ? this.currUser = data : console.log('No user Logged'));
  }

    // Logging In Functions
  login(loginFormUser): void {
    const user: LoginUser = <LoginUser>(loginFormUser);
     this.api.logIn(user).subscribe( data => {
      if ( data.id.length > 0) {
          this.currUser = data;
          this.loggedIn.emit(data.firstName);
          if  (data.isAdmin[0]) {
            this.router.navigate(['/admin']); }
          this.checkAvailableCart();
      }  else {
         this.loginMsg = data;
        }
      });
  }
  isTaken(idToCheck, emailToCheck): Observable<Boolean> {
    return this.api.isDetailsTaken(idToCheck, emailToCheck);
  }
  register(registerFormValues): void {
    delete registerFormValues.confpassword;
    const user: RegisteredUser = <RegisteredUser>(registerFormValues);
    this.api.register(user).subscribe(data =>  this.currUser = data  );
  }
  logOut(): void {
    this.api.logOut().subscribe(data => {
      this.loginMsg = '';
      this.currUser = {} as User;
      this.cart = {} as Cart;
      this.order = {} as Order;
    });
  }

    // Shop functions - Users
  checkAvailableCart(): void {
      this.api.checkAvailableCart().subscribe( data => {
        if (data[0]) {
            this.cart = data[0];
            this.loginMsg = `You have an open Cart from: ${data[0].creationDate}`;
          } else {
              this.newCart();
              this.checkAvailableOrder();
            }
      });
  }
  checkAvailableOrder(): void {
    this.api.checkAvailableOrder().subscribe( data => {
      if (data) {
        this.order = data;
        this.loginMsg = `Your last Order is from: ${(this.order.orderDate)}`;
      } else {
        this.loginMsg = `Welcome to your first purchase`;
      }
    });
  }
  getAllProducts(): Observable<Number> {
    return this.api.getAllProducts();
  }
  getAllOrders(): Observable<Number> {
    return this.api.getAllOrders();
  }
  getAllCartProducts(cartId): Observable<CartProduct[]> {
    return this.api.getAllCartProducts(cartId);
  }
  newCart(): void {
     this.api.newCart().subscribe(data => {
      if (data) {
        this.cart = data;
      }
    } );
  }
  getAllCatagories(): Observable<Catagory[]> {
    return this.api.getAllCatagories();
  }
  getCatagoryProducts(catagoryName): Observable<Product[]> {
    return this.api.getCatagoryProducts(catagoryName);
  }
  searchProduct(searchTerm): Observable<any> {
    return this.api.searchProduct(searchTerm);
  }
  addCartProduct(cartProductObj): Observable<CartProduct> {
    return this.api.addCartProduct(cartProductObj);
  }
  getCartPrice(): Observable<Number> {
    return this.api.getCartPrice(this.cart.id);
  }
  deleteProduct(id): any {
    return this.api.deleteProduct(id, this.cart.id);
  }
  deleteCartProducts(): any {
    this.api.deleteCartProducts(this.cart.id).subscribe( data => console.log(data));
  }
  checkAvailableDate (shipDate): Observable<boolean> {
    return this.api.checkAvailableShipDate(shipDate);
  }
  newOrder(orderObj): Observable<Order> {
    return this.api.newOrder(orderObj);
  }
  deleteCartAfterOrder(): Observable<Cart> {
    return this.api.deleteCartAfterOrder(this.cart.id);
  }
  downloadReciept(): Observable<any> {
    return this.api.downloadRecipet(this.cart.id);
  }

  userActions(): void {
    this.userTrigger.emit('CHANGE');
  }

  searchInCart(wordToSearch): void {
    this.searchInCartTrigger.emit(wordToSearch);
  }

  // Admin Functions
isProductTaken(id): Observable<boolean> {
  return this.api.isTaken(id);
}

addProduct(productObj): Observable<Product> {
  return this.api.addProduct(productObj);
}

updateProduct(productObj): Observable<Product> {
  return this.api.updateProduct(productObj);
}

receiveSelected(product: Product): void {
  this.selectedProduct.emit(product);
}

adminActions(): void {
  this.adminTrigger.emit('CHANGE');
}

}
