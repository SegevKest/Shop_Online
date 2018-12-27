import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './comps/login/login.component';
import { RegisterComponent } from './comps/register/register.component';
import { ShopComponent } from './comps/shop/shop.component';
import { CashierComponent } from './comps/cashier/cashier.component';
import { NotFoundComponent } from './comps/not-found/not-found.component';
import { AdminComponent } from './comps/admin/admin.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'cashier', component: CashierComponent},
  {path: 'admin', component: AdminComponent},
  {path: '', component: LoginComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
