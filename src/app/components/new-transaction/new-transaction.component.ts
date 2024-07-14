import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Transaction } from 'src/app/shared/interfaces/transaction';
import { UserDataService } from 'src/app/shared/services/user-data.service';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.css']
})
export class NewTransactionComponent implements OnInit {
  defaultDate: string;
  transArr: Transaction[] = this._UserDataService.transactions; 
  constructor(private _UserDataService:UserDataService , private _ToastrService:ToastrService){
    const today = new Date();
    this.defaultDate = today.toISOString().split('T')[0];
  }
  transGroup:FormGroup = new FormGroup({
    id:new FormControl(``,[Validators.required]),
    customer_id:new FormControl('',[Validators.required]),
    date:new FormControl('',[Validators.required]),
    amount: new FormControl('',[Validators.required])
  },{validators:[this.cofirmId]} as FormControlOptions);
  cofirmId(group:FormGroup):void{
    let id = group.get('id');
    let customer_id = group.get('customer_id');
    let date = group.get('date');
    let amount = group.get('amount');
    if(id?.value == null && customer_id?.value == null && date?.value == null && amount?.value == null){
      id?.setErrors({required:true})
      this.transArr.forEach(element =>{
        if(id?.value == element.id){
          id?.setErrors({mismatch:true})
        }
      });
    }
  }
  msgerr:string ='';
  handleForm():void{
    if(this.transGroup.valid){
      this.transArr.push(this.transGroup.value)
      localStorage.setItem("trans",JSON.stringify(this.transArr))
    }
    this._ToastrService.success('Customer Added Successfully');
  }
  ngOnInit(): void {
  }
}
