import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isAddUserPopup = false;
  companiesListALL: any;
  updateCompanyData : any;
  invaildFormErr = false;

  companycreateForm:FormGroup = new FormGroup({
    companyname: new FormControl(null,[Validators.required]),
    companyaddress: new FormControl(null, [Validators.required]),
  });

  constructor(private apiServices : ServicesService) { 
    this.apiServices.companiesListAll().subscribe((data:any)=>{
      this.companiesListALL = data.message;
      console.log(this.companiesListALL);
    });
  }

  isVaild(controlName){
    return this.companycreateForm.get(controlName).invalid && this.companycreateForm.get(controlName).touched;
  }

  addCompany(){
    if(!this.companycreateForm.valid){
      this.invaildFormErr = true;
      return;
    }else{
      this.apiServices.createCompany(this.companycreateForm.value).subscribe((data:any)=>{
        window.location.reload();
        console.log(data);
      })
    }
  }

  ngOnInit(): void {
  }

  onClickAddUser(){
    this.isAddUserPopup = true;    
  }

  onClickEditUser(){
    this.isAddUserPopup = false;
  }

  onClickDeleteUser(){
    this.isAddUserPopup = false;    
  }

  cancelAddPopup(){
    this.isAddUserPopup = false;
  }

  cancelEditPopup(){
    this.isAddUserPopup = false;
  }

  cancelDeletePopup(){
    this.isAddUserPopup = false;
  }

}


