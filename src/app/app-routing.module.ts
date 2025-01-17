import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';

const routes: Routes = [
  {path:"",component:PaymentFormComponent},
  {path:"calculate",component:PaymentFormComponent},
  {path:"history",component:PaymentHistoryComponent},
  {path:"*",component:PaymentHistoryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
