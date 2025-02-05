import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DataService {
 private apiUrl = environment.apiUrl

  constructor(private http:HttpClient) { }


  fetchCampaignsList(){
    return this.http.get(this.apiUrl)
  }

  submitCampaignsData(data:any){
    return this.http.post(this.apiUrl,data)
  }
}
