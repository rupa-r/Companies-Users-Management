import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  isDeleteUserPopup = false;
  isAddUserPopup = false;
  isEditUserPopup = false;

  constructor() { }

  ngOnInit(): void {
  }

  onClickAddUser(){
    this.isDeleteUserPopup = false;
    this.isEditUserPopup = false;
    this.isAddUserPopup = true;
  }

  onClickEditUser(){
    this.isDeleteUserPopup = false;
    this.isEditUserPopup = true;
    this.isAddUserPopup = false;
  }

  onClickDeleteUser(){
    this.isDeleteUserPopup = true;
    this.isEditUserPopup = false;
    this.isAddUserPopup = false;
  }

  cancelAddPopup(){
    this.isDeleteUserPopup = false;
    this.isAddUserPopup = false;
    this.isEditUserPopup = false;
  }

  cancelEditPopup(){
    this.isDeleteUserPopup = false;
    this.isAddUserPopup = false;
    this.isEditUserPopup = false;
  }

  cancelDeletePopup(){
    this.isDeleteUserPopup = false;
    this.isAddUserPopup = false;
    this.isEditUserPopup = false;
  }
}
