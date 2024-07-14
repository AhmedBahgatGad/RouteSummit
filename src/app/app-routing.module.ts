import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { NewTransactionComponent } from './components/new-transaction/new-transaction.component';

const routes: Routes = [{ path: '', component: HomeComponent, title: 'Transactions System' },
{
  path: 'home', component: HomeComponent, title: 'Transactions System',
  children: [{ path: 'addTransaction', component: NewTransactionComponent, title: 'Add New Trans' }]
},
{ path: 'addcustomer', component: AddCustomerComponent, title:'Add Customer' },
{path:'addTransaction',component:NewTransactionComponent,title: 'Add New Trans'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
