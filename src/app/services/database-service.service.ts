import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { CarBillModel } from '../models/carbill-model';

@Injectable({
  providedIn: 'root'
})
export class DatabaseServiceService {
  //url of the api
  url: string = environment.baseUrl + "PaimentDetails"
  //list of payment
  paymentList: CarBillModel[] = []

  constructor(private http: HttpClient) { }

  /**
   * refresh the list of payment from the database
   */
  refreshList() {
    this.http.get(this.url).subscribe({
      next: res => {
        this.paymentList = res as CarBillModel[]
      },
      error: err => { console.log(err) }
    })
  }

  /**
   * add a new payment to the list of payment
   * @param formData : the new payment data to add
   */
  addData(formData: CarBillModel) {
    this.http.post(this.url, formData).subscribe({
      next: res => {
        console.log(res);
      },
      error: err => { console.log(err) }
    })
  }
}
