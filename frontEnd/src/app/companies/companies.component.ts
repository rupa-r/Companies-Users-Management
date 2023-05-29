import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../services/services.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  map: L.Map;
  
  isAddUserPopup = false;
  isDeleteUserPopup = false;
  isEditUserPopup = false;
  _id:any;
  companiesName : any;
  companiesAddress : any;
  updateCompanydata : FormGroup;
  UserListALL:any;
  companyId:any;
  companyCoordinates:any;

  longitude:any;
  latitude :any;

  users = [];

  usercreateForm:FormGroup = new FormGroup({
    fristname: new FormControl(null,[Validators.required]),
    lastname: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    designation: new FormControl(null, [Validators.required]),
    dob: new FormControl(null, [Validators.required]),
  });

  isVaild(controlName){
    return this.usercreateForm.get(controlName).invalid && this.usercreateForm.get(controlName).touched;
  }

  constructor(private activateroute : ActivatedRoute,private formbuilber: FormBuilder,private router : Router, private apiServices : ServicesService) { 
    this.activateroute.queryParams.subscribe(res=>{
      this._id = res.id;
    })
  }

  ngOnInit(): void {
    this.apiServices.companiesListbyIId(this._id).subscribe((data:any)=>{
      
      this.companiesName = data.message[0].companyname;
      this.companiesAddress = data.message[0].companyaddress;   
      this.companyId = data.message[0].companyid;   
      this.companyCoordinates = data.message[0].companycoordinates;

      for (let index = 0; index < this.companyCoordinates.length; index++) {
        const element = this.companyCoordinates[index];
        this.longitude = element.longitude;
        this.latitude = element.latitude;
        this.map = L.map('map').setView([0, 0], 2); // Set the initial view and zoom level
      
        // Add a tile layer to display the map
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: 'Map data © OpenStreetMap contributors'
        }).addTo(this.map);
      
        // Add markers for longitude and latitude coordinates
        const longitude = this.longitude; // Example longitude value
        const latitude = this.latitude; // Example latitude value
      
        L.marker([latitude, longitude]).addTo(this.map)
        .bindPopup(`Latitude: ${latitude}<br>Longitude: ${longitude}`)
        .openPopup();
      }
      
      this.updateCompanydata = this.formbuilber.group({
        companyname: this.companiesName,
        companyaddress: this.companiesAddress 
      })
      this.usercreateForm = this.formbuilber.group({
        companyid : this.companyId,
        fristname: [''],
        lastname: [''],
        email: [''],
        designation: [''],
        dob: [''],
      })
    })
    this.apiServices.usersListAll().subscribe((data:any)=>{
      this.UserListALL = data.message;
      for (let index = 0; index < this.UserListALL.length; index++) {
        const element = this.UserListALL[index];
        if (element.companyid === this.companyId) {
          this.users.push(element);
          console.log(element);
        }
      }
    })

  }



  editCompany(){
    this.apiServices.updateCompanybyId(this._id, this.updateCompanydata.value).subscribe((data:any)=>{
      window.location.reload();
      console.log(data);
    })
  }

  deleteCompany(){
    this.apiServices.deleteCompanybyId(this._id).subscribe((data:any)=>{
      this.router.navigate(['/']);
    })
  }

  createUser(){
    console.log(this.usercreateForm.value);
    this.apiServices.createUsers(this.usercreateForm.value).subscribe((data:any)=>{
      window.location.reload();
      console.log(data);
      
    })
    
  }

  onClickAddUser(){
    this.isAddUserPopup = true;
  }

  cancelAddPopup(){
    this.isAddUserPopup = false;
  }

  onClickDeleteUser(){
    this.isEditUserPopup = false;
    this.isDeleteUserPopup = true;
  }

  onClickEditUser(){
    this.isEditUserPopup = true;
    this.isDeleteUserPopup = false;
  }

  cancelEditPopup(){
    this.isEditUserPopup = false;
    this.isDeleteUserPopup = false;
  }

  cancelDeletePopup(){
    this.isEditUserPopup = false;
    this.isDeleteUserPopup = false;
  }
}
