import { Component, OnInit, OnChanges } from '@angular/core';
import { ShopService } from 'src/app/services/shop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {

  constructor(public shop: ShopService,
              private router: Router) { }

  guestName = 'Guest';

  ngOnInit() {
    this.shop.loggedIn.subscribe( data => this.guestName = data);
  }

  ngOnChanges() {
    this.getUserName();
  }

  logOut(): void {
    this.shop.logOut();
    this.router.navigate(['/login']);
  }

  getUserName(): void {
    this.guestName = this.shop.currUser.firstName ? this.shop.currUser.firstName : 'Guest';
  }

}
