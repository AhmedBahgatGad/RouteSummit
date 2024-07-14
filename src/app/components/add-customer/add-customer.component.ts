import { Component } from '@angular/core';
import { UserDataService } from '../../shared/services/user-data.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from 'src/app/shared/interfaces/customer';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent {
  customerArr:Customer [] = this._UserDataService.customers;
  constructor(private _UserDataService:UserDataService ,private _ToastrService:ToastrService, private _Router:Router , private _FormBuilder:FormBuilder){}
  customerGroup:FormGroup = new FormGroup({
    id:new FormControl(`${this.customerArr.length+1}`,[Validators.required]),
    name:new FormControl('',[Validators.required])
  })
  handleForm():void{
    if(this.customerGroup.valid){
      this.customerArr.push(this.customerGroup.value)
      localStorage.setItem("customers",JSON.stringify(this.customerArr))
      this._ToastrService.success('Customer Added Successfully');
    }
  }
}
