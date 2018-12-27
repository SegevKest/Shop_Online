import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ShopService } from 'src/app/services/shop.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  ableToResume: Boolean = false;
  errMsg = '';
  constructor(  private shop: ShopService,
                private router: Router) {}

  ngOnInit() {
    this.createForm();
  }
  private createForm() {
    this.registerForm = new FormGroup({
      id: new FormControl('' , [Validators.required, Validators.pattern('^[0-9]*$')]),
      email: new FormControl('' , [Validators.required, Validators.email]),
      password: new FormControl('' , Validators.required),
      confpassword: new FormControl('' , Validators.required),
      firstName: new FormControl('' , Validators.required),
      lastName: new FormControl('' , Validators.required),
      street: new FormControl('' , Validators.required),
      city: new FormControl('' , Validators.required)
    });
  }

  resumeRegister(): void {
    this.errMsg = '';
    const idToCheck: string = this.registerForm.value.id;
    const emailToCheck: string = this.registerForm.value.email;
    const userPassword: string = this.registerForm.value.password;
    const confPassword: string = this.registerForm.value.confpassword;
    this.shop.isTaken(idToCheck, emailToCheck).subscribe(data => {
      if  (data[0]) {
        this.errMsg = 'ID is Taken';
      }
      if (data[1]) {
        this.errMsg += ' Email is Taken ';
      }
      if (! (userPassword === confPassword)) {
        this.errMsg += 'Passwords are not match';
      }
      this.ableToResume = this.errMsg.length === 0 ;
    });
  }

  register(): void {
    if (this.registerForm.invalid) { return; }
    this.shop.register(this.registerForm.value);
    this.router.navigate(['/login']);
  }
}
