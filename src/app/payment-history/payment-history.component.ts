import { Component, OnInit } from '@angular/core';
import { DatabaseServiceService } from '../services/database-service.service';
import { CarBillModel } from '../models/carbill-model';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss']
})
export class PaymentHistoryComponent implements OnInit {
  
  constructor(public service:DatabaseServiceService){

  }
  ngOnInit(): void {
    this.service.refreshList();
  }

}
