import { Component, OnInit } from '@angular/core';
import { DatabaseServiceService } from '../services/database-service.service';
import { CarBillModel } from '../models/carbill-model';
import { CalculationServiceService } from '../services/calculation-service.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit {
  /**
   * object to store the form data
   */
  formData:CarBillModel = new CarBillModel()

  
  constructor(
    public database_service:DatabaseServiceService,
    public calculation_service:CalculationServiceService,
    private toastr: ToastrService
  ){}

  ngOnInit(): void {}

  /**
   * submit the form if it is valid and add the data to the database after refreshing the calculations
   */
  submitForm(){
    if (this.isFormValid()){
      this.refreshCalculations();
      this.formData.buy_date = (new Date()).toLocaleDateString('en-GB');
      this.database_service.addData(this.formData);
      this.toastr.success("Form submitted successfully");
    }
  }

  /**
   * refresh the calculations and update the form data object
   */
  refreshCalculations() {
    if (this.isFormValid())
    {this.formData = this.calculation_service.makeCalaculation(this.formData);}
  }

  /**
   * validate the form data with additional checks
   * @returns true if the form is valid
   */
  isFormValid():boolean {
    if (this.formData.base_price <= 0 || this.formData.custom_cost < 0)
    {
      this.toastr.error("Base price must be greater than 0 and custom cost must be greater or equal to 0");
      return false;
    }
    return true;
  }

  /**
   * submit the form data to the database and reset the form
   * @param form NgForm object to be submitted
   */
  onSubmit(form:NgForm) {
    if(form.valid){
      this.submitForm();
      form.reset();
      this.formData = new CarBillModel();
    }else{
      this.toastr.error("Please fill all the fields");
    }
  }
}
