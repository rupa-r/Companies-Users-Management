import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../services/services.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  isDeleteUserPopup = false;
  isEditUserPopup = false;
  isMigrateUserPopup = false;
  isDeactiveUserPopup = false;
  isActiveUserPopup = false;
  _id: any;
  userDetails: any;
  deactiveUserdata: { status: string; };
  companylistAll: any;
  migrateusercreateForm:any;
  usereditForm: FormGroup;

  companyId:any;

  Active = false;
  Deactive = false;

  fristName: string = '';
  lastName: string;
  Email: string = '';
  Designation: string = '';
  DoB : string = '';

  companyName :any;
  companyAddress :any;

  constructor(private router : Router, private apiServices : ServicesService,private formbuilber: FormBuilder,private activateroute : ActivatedRoute) { 
    this.activateroute.queryParams.subscribe(res=>{
      this._id = res.id;
    })
  }

  ngOnInit(): void {
    this.apiServices.userListbyIId(this._id).subscribe((data:any)=>{
      this.userDetails = data.message;
      this.companyId = data.message[0].companyid;
      for (let index = 0; index < data.message.length; index++) {
        const element = data.message[index];
        this.fristName = element.fristname;
        this.lastName = element.lastname;
        this.Email = element.email;
        this.Designation = element.designation;
        this.DoB = element.dob;
        
        if (element.status === "Active") {
          this.Active = false;
          this.Deactive = true;
        }else if (element.status === "Deactive") {
          this.Active = true;
          this.Deactive = false;
        }
      }
      
      this.apiServices.companiesListbyId(this.companyId).subscribe((data:any)=>{
        this.companyName = data.message[0].companyname;
        this.companyAddress = data.message[0].companyaddress;
      })
    })
    this.apiServices.companiesListAll().subscribe((data:any)=>{
      this.companylistAll = data.message;
    })
    this.migrateusercreateForm = this.formbuilber.group({
      companyid : [''],
    })
    this.usereditForm = this.formbuilber.group({
      fristname : [''],
      lastname : [''],
      email : [''],
      designation : [''],
      dob : ['']
    })    
  }

  activeUser(){
    this.deactiveUserdata = {
      status : "Active"
    }
    this.apiServices.deactiveuserbyId(this._id,this.deactiveUserdata).subscribe((data:any)=>{
      window.location.reload();  
    })
  }

  updateUser(){
    this.apiServices.updateUserbyId(this._id, this.usereditForm.value).subscribe((data:any)=>{
      window.location.reload();
    })
    
  }

  deactiveUser(){
    this.deactiveUserdata = {
      status : "Deactive"
    }
    this.apiServices.deactiveuserbyId(this._id,this.deactiveUserdata).subscribe((data:any)=>{
      window.location.reload();  
    })
  }

  migrateUser(){
    console.log(this.migrateusercreateForm.value);
    this.apiServices.migrateuserbyId(this._id,this.migrateusercreateForm.value).subscribe((data:any)=>{
      this.router.navigate(['/']);
    })
  }

  deleteUser(){
    this.apiServices.deleteUserbyId(this._id).subscribe((data:any)=>{
      this.router.navigate(['']);
    })
  }

  onClickEditUser(){
    this.isDeleteUserPopup = false;
    this.isEditUserPopup = true;
    this.isMigrateUserPopup = false;
    this.isDeactiveUserPopup = false;
    this.isActiveUserPopup = false;
  }

  onClickDeleteUser(){
    this.isDeleteUserPopup = true;
    this.isEditUserPopup = false;
    this.isMigrateUserPopup = false;
    this.isDeactiveUserPopup = false;
    this.isActiveUserPopup = false;
  }

  onClickMigrateUser(){
    this.isDeleteUserPopup = false;
    this.isEditUserPopup = false;
    this.isMigrateUserPopup = true;
    this.isDeactiveUserPopup = false;
    this.isActiveUserPopup = false;
  }

  cancelEditPopup(){
    this.isDeleteUserPopup = false;
    this.isEditUserPopup = false;
    this.isMigrateUserPopup = false;
    this.isDeactiveUserPopup = false;
    this.isActiveUserPopup = false;
  }

  cancelDeletePopup(){
    this.isDeleteUserPopup = false;
    this.isEditUserPopup = false;
    this.isMigrateUserPopup = false;
    this.isDeactiveUserPopup = false;
    this.isActiveUserPopup = false;
  }

  cancelMigratePopup(){
    this.isDeleteUserPopup = false;
    this.isEditUserPopup = false;
    this.isMigrateUserPopup = false;
    this.isDeactiveUserPopup = false;
    this.isActiveUserPopup = false;
  }

  onClickDeactiveUser(){
    this.isDeleteUserPopup = false;
    this.isEditUserPopup = false;
    this.isMigrateUserPopup = false;
    this.isDeactiveUserPopup = true;
    this.isActiveUserPopup = false;
  }

  onClickActiveUser(){
    this.isDeleteUserPopup = false;
    this.isEditUserPopup = false;
    this.isMigrateUserPopup = false;
    this.isDeactiveUserPopup = false;
    this.isActiveUserPopup = true;
  }
}
