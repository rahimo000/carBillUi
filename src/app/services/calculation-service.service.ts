import { Injectable } from '@angular/core';
import { CarBillModel } from '../models/carbill-model';

@Injectable({
  providedIn: 'root'
})
export class CalculationServiceService {


  /**
   * make calaculation for the car bill using the formData and return the formData with the calculated values
   * @param formData : CarBillModel
   * @returns the formData with the calculated values
   */
  makeCalaculation(formData: CarBillModel): CarBillModel {
    formData.fixed_cost = 100; // fixed cost is 100

    if (formData.type == 'O') { // if the car is regular

      // calculate the base coast for the car as 10% of the base price and limit it between 10 and 50
      formData.base_Coast = formData.base_price * 0.1;
      formData.base_Coast = formData.base_Coast > 50 ? 50 : (formData.base_Coast < 10 ? 10 : formData.base_Coast);

      // calculate the special coast for the car as 2% of the base price
      formData.special_Coast = formData.base_price * 0.02;

    } else { // if the car is luxury

      // calculate the base coast for the car as 10% of the base price and limit it between 25 and 200
      formData.base_Coast = formData.base_price * 0.1;
      formData.base_Coast = formData.base_Coast > 200 ? 200 : (formData.base_Coast < 25 ? 25 : formData.base_Coast);

      // calculate the special coast for the car as 2% of the base price
      formData.special_Coast = formData.base_price * 0.04;

    }

    // calculate the association cost for the car using the base price and the following rules
    formData.association_Cost =
      formData.base_price <= 500 ? 5 :
        (formData.base_price <= 1000 ? 10 :
          (formData.base_price <= 3000 ? 15 : 20));

    // calculate the total price for the car by adding all the costs
    formData.total_price = formData.base_price + formData.fixed_cost + formData.base_Coast + formData.special_Coast + formData.association_Cost + formData.custom_cost;


    return formData;
  }

  constructor() { }
}
