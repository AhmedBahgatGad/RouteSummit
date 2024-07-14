import { Transaction } from './../interfaces/transaction';
import { Injectable } from '@angular/core';
import { Customer } from '../interfaces/customer';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor() { }
  customers: Customer[] = [{
    id: 1,
    name: "Ahmed Bahgat"
  },
  {
    id: 2,
    name: "Ahmed Ali"
  }, {
    id: 3,
    name: "Aya Elsayed"
  }, {
    id: 4,
    name: "Mina Adel"
  }, {
    id: 5,
    name: "Sarah Reda"
  },
  {
    id: 6,
    name: "Mohamed Sayed"
  }];
  transactions: Transaction[]=[{
    id:1,
    customer_id:1,
    date:"2022-01-01",
    amount:1000
  },{
    id:2,
    customer_id:1,
    date:"2022-01-02",
    amount:2000
  },{
    id:3,
    customer_id:2,
    date:"2022-01-01",
    amount:550
  },{
    id:4,
    customer_id:3,
    date:"2022-01-01",
    amount:500
  },{
    id:5,
    customer_id:2,
    date:"2022-01-02",
    amount:1300
  },{
    id:6,
    customer_id:4,
    date:"2022-01-01",
    amount:750
  },{
    id:7,
    customer_id:3,
    date:"2022-01-02",
    amount:1250
  },{
    id:8,
    customer_id:5,
    date:"2022-01-01",
    amount:2500
  },{
    id:9,
    customer_id:5,
    date:"2022-01-02",
    amount:875
  }];
  getCustomers():Observable<Customer[]>{
    let customers = localStorage.getItem('customers');
    if(customers == null){
      return of(this.customers);
    }
    else{
      this.customers = JSON.parse(customers)
      return of(JSON.parse(customers));
    }
  }
  getCustomerData():Observable<Transaction[]>{
    let storedData = localStorage.getItem('trans');
    if(storedData == null){
      return of(this.transactions);
    }
    else{
      this.transactions = JSON.parse(storedData)
      return of(JSON.parse(storedData));
    }
  }
}
