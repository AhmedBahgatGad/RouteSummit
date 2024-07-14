import { Component } from '@angular/core';
import { UserDataService } from '../../shared/services/user-data.service';
import { Customer } from '../../shared/interfaces/customer';
import { Transaction } from '../../shared/interfaces/transaction';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  customers: Customer[] = [];
  transactions: Transaction[] = [];
  total: number = 0;
  dataLoaded: boolean = false;
  constructor(private _UserDataService: UserDataService) { }
  ngOnInit(): void {
    this._UserDataService.getCustomers().subscribe((customers: Customer[]) => {
      this.customers = customers
    });
  }
  onTypingAmount(event: any): void {
    const value = event.target.value;
    this.loadData({ amount: value });
  }
  onTypingName(event: any): void {
    const value = event.target.value;
    this.loadCustomers(value)
  }
  filteredCustomers: Customer[] = [];
  loadCustomers(name: string) {
    this.filteredCustomers = [];
    this.customers.forEach(element => {
      if (element.name.toLowerCase() == name.toLowerCase()) {
        this.filteredCustomers.push(element);
      }
    });
  }
  loadData(options = {}): void {
    let defaultValues = {
      id: 0,
      amount: 0
    }
    Object.assign(defaultValues, options);
    this._UserDataService.getCustomerData().subscribe((transactions: Transaction[]) => {
      this.transactions = [];
      this.total = 0;
      if (defaultValues.amount == 0) {
        transactions.forEach(element => {
          if (element.customer_id == defaultValues.id) {
            this.transactions.push(element);
            this.total += element.amount;
          }
        });
        if (this.transactions.length == 0) {
          this.transactions = [{ id: 0, customer_id: defaultValues.id, date: "Didn't make transactions", amount: 0 }]
        }
      }
      else {
        transactions.forEach(element => {
          if (element.amount >= defaultValues.amount) {
            this.transactions.push(element);
            this.total += element.amount;
          }
        });
        if (this.transactions.length == 0) {
          this.transactions = [{ id: 0, customer_id: defaultValues.id, date: "Didn't make transactions", amount: 0 }]
        }
      }
      this.dataLoaded = true;
    });
  }
  /* carousel */
  categories:any = [];
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
}

