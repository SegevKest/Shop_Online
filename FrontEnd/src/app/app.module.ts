import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule , FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './comps/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './comps/header/header.component';
import { RegisterComponent } from './comps/register/register.component';
import { SidebarCartComponent } from './comps/sidebar-cart/sidebar-cart.component';
import { ShopComponent } from './comps/shop/shop.component';
import { ProductsComponent } from './comps/products/products.component';
import { ProductComponent } from './comps/product/product.component';
import { SidebarProductComponent } from './comps/sidebar-product/sidebar-product.component';
import { AddProductToCartComponent } from './comps/add-product-to-cart/add-product-to-cart.component';
import { CashierComponent } from './comps/cashier/cashier.component';
import { OrderComponent } from './comps/order/order.component';
import { NotFoundComponent } from './comps/not-found/not-found.component';
import { AdminComponent } from './comps/admin/admin.component';
import { AdminPanelComponent } from './comps/admin-panel/admin-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    RegisterComponent,
    SidebarCartComponent,
    ShopComponent,
    ProductsComponent,
    ProductComponent,
    SidebarProductComponent,
    AddProductToCartComponent,
    CashierComponent,
    OrderComponent,
    NotFoundComponent,
    AdminComponent,
    AdminPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
