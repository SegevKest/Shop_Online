import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, LoginUser, RegisteredUser } from 'src/models/User';
import { Cart } from 'src/models/Cart';
import { CartProduct } from 'src/models/CartProduct';
import { Product } from 'src/models/Product';
import { Order } from 'src/models/Order';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpOptions = {
    headers: new HttpHeaders({  'Content-Type': 'application/json'  })
  };

  constructor( private http: HttpClient) {}

  // Logging In Functions
  isUserLogged(): Observable<User>  { // isLogged
    return this.http.get<User>('/isUserLogged');
  }
  isDetailsTaken(idToCheck: String, emailToCheck: String): Observable<Boolean> {
    return this.http.post<Boolean>('/idEmailTaken', {id: idToCheck, email: emailToCheck}, this.httpOptions);
  }
  register(userObj: RegisteredUser): Observable<RegisteredUser> { // registered
    return this.http.post<RegisteredUser>('/register', userObj, this.httpOptions);
  }
  logIn(loginUser: LoginUser): Observable<any> { // Login
    return this.http.post<any>('/login', loginUser , this.httpOptions);
  }
  logOut(): Observable<any> { // logout
    return this.http.get<any>('/logout');
  }

  // Shop functions - Users
  getAllProducts(): Observable<Number> {
    return this.http.get<Number>('/shop/allProducts');
  }
  getAllOrders(): Observable<Number> {
    return this.http.get<Number>('/shop/allOrders');
  }
  // before Build, change this to 'Get' function, getting the userid from the session.
  // checkAvailableCart(id): Observable<any> {
  checkAvailableCart(): Observable<any> {
     return this.http.post<any>('/shop/isThereCart', this.httpOptions);
  }
  // before Build, change this to 'Get' function, getting the userid from the session.
  checkAvailableOrder(): Observable<any> {
    // return this.http.post<any>('/shop/isLastOrder', {id: id}, this.httpOptions);
    return this.http.post<any>('/shop/isLastOrder', this.httpOptions);
  }
  getAllCartProducts(cartId): Observable<CartProduct[]> {
    return this.http.post<CartProduct[]>('/shop/cartProducts', {cartId: cartId}, this.httpOptions);
  }
  // before Build, change this to 'Get' function, getting the userid from the session.
  newCart(): Observable<Cart> {
    return this.http.post<Cart>('/shop/newCart', this.httpOptions);
  }
  getAllCatagories(): Observable<any> {
    return this.http.get<any>('/shop/allCatagories');
  }
  getCatagoryProducts(catagoryName): Observable<Product[]> {
    return this.http.get<Product[]>(`/shop/${catagoryName}`);
  }
  searchProduct(productName): Observable<any> {
    return this.http.get<any>(`/shop/search/${productName}`);
  }
  addCartProduct(cartProductObj): Observable<CartProduct> {
    return this.http.post<CartProduct>('/shop/addCartProduct', cartProductObj, this.httpOptions);
  }
  getCartPrice(cartId): Observable<number> {
    return this.http.post<number>('/shop/totalPrice', {cartId: cartId}, this.httpOptions);
  }
  deleteProduct(id, cartId): Observable<CartProduct> {
    return this.http.request<CartProduct>('delete' , `/shop/${id}` , {
      body: {cartId: cartId},
      headers: new HttpHeaders({  'Content-Type': 'application/json'  })
    });
  }
  deleteCartProducts(cartId): Observable<any> {
    return  this.http.request<any>('delete' , `/shop/deleteAllCart` , {
      body: {cartId: cartId},
      headers: new HttpHeaders({  'Content-Type': 'application/json'  })
    });
  }
  checkAvailableShipDate(shippingDate): Observable<boolean> {
    return this.http.post<boolean>('/shop/availableShipDate', {dateToDeliver: shippingDate }, this.httpOptions);
  }
  newOrder(orderObj): Observable<Order> {
    return this.http.post<Order>('/shop/orderCart', orderObj, this.httpOptions);
  }
  deleteCartAfterOrder(id): Observable<Cart> {
    return this.http.request<Cart>('delete',  '/shop/deleteCart', {
      body: {id: id},
      headers: new HttpHeaders({  'Content-Type': 'application/json'})});
  }
  downloadRecipet(cartId): Observable<any> {
    return this.http.post<any>('/shop/downloadReciept', {cartId: cartId}, this.httpOptions);
  }

// Admin Functions

isTaken(id): Observable<boolean> {
  return this.http.post<boolean>('/admin/isTaken/', {id: id}, this.httpOptions);
}
addProduct(productObj): Observable<Product> {
  return this.http.post<Product>('/admin/', productObj, this.httpOptions );
}

updateProduct(productObj): Observable<Product> {
  return this.http.put<Product>(`/admin/${productObj.id}`, productObj, this.httpOptions );
}




}
