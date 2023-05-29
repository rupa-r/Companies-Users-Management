import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  _url = environment.server_url;
  
  constructor(private http: HttpClient, private router: Router) { }

  // Companies API

  // Post APi

  createCompany(data : any){
    const url = this._url + '/api/companyinsert';
    return this.http.post<any>(url, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  createUsers(data : any){
    const url = this._url + '/api/userinsert';
    return this.http.post<any>(url, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  // Get APi
  companiesListAll(){
    const url = this._url + '/api/companyget';
    return this.http.get<any>(url)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  
  companiesListbyId(id: any){
    const url = this._url + '/api/companyid/' + id;
    return this.http.get<any>(url)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  // _id
  companiesListbyIId(id: any){
    const url = this._url + '/api/company/' + id;
    return this.http.get<any>(url)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  usersListAll(){
    const url = this._url + '/api/userget';
    return this.http.get<any>(url)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

    // _id
  userListbyIId(id: any){
    const url = this._url + '/api/useriid/' + id;
    return this.http.get<any>(url)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  // Update APi
  updateCompanybyId(id : any, data: any){
    const url = this._url + '/api/companyupdate/' + id;
    return this.http.put<any>(url, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deactiveuserbyId(id : any, data: any){
    const url = this._url + '/api/userdeactive/' + id;
    return this.http.put<any>(url, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  migrateuserbyId(id : any, data: any){
    const url = this._url + '/api/migrateuser/' + id;
    return this.http.put<any>(url, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateUserbyId(id : any, data: any){
    const url = this._url + '/api/userupdate/' + id;
    return this.http.put<any>(url, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  // delete APi
  deleteCompanybyId(id: any){
    const url = this._url + '/api/companydelete/' + id;
    return this.http.delete<any>(url)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  // delete APi
  deleteUserbyId(id: any){
    const url = this._url + '/api/userdelete/' + id;
    return this.http.delete<any>(url)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

}
