import { Component, OnInit } from '@angular/core';
import { ShopService } from 'src/app/services/shop.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/models/Product';



@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  updateShopForm: FormGroup;
  updateOrSave = false; // update- false, save-true
  errMsg = '';
  succMsg = '';
  takenId: boolean;
  constructor(private shop: ShopService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.updateShopForm = this.formBuilder.group({
      name: ['', Validators.required],
      id: ['', Validators.required],
      price : ['', Validators.required],
      imgUrl: ['', Validators.required],
      catagoryId: ['', Validators.required]
    });
    this.shop.selectedProduct.subscribe( data =>  {
      this.errMsg = '', this.succMsg = '';
      this.updateOrSave = false;
      this.updateShopForm.patchValue(data);
     });
     this.shop.adminTrigger.subscribe( () => {
      this.succMsg = 'Changes Made ! ';
     });
    }

  addNewProduct() {
    this.succMsg = '';
    this.updateOrSave = true;
    this.updateShopForm.reset();
  }
  newProduct() {
    const newProductObj = this.updateShopForm.value;
    if ( ! this.takenId)  {
      this.shop.addProduct(newProductObj).subscribe(data =>  this.shop.adminActions());
    }
  }
  checkAvailability () {
    this.shop.isProductTaken(this.updateShopForm.value.id).subscribe( answer => {
        if (answer) {
          this.takenId = true;
          this.errMsg = ` Taken Product Id, Choose Another One`;
        } else {
          this.takenId = false;
          this.errMsg = '';
        }
    });
  }

  updateProduct() {
    const datedProductObj = this.updateShopForm.value;
    this.shop.updateProduct(datedProductObj).subscribe(data => this.shop.adminActions());
  }

  saveChanges() {
  switch (this.updateOrSave) {
    case true:
        this.newProduct();
        break;
    case false:
        this.updateProduct();
  }
  }

}
