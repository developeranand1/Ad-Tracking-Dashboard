import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
 private apiUrl = 'http://localhost:4000/api/metrics';

  constructor(private http:HttpClient) { }


  fetchCampaignsList(){
    return this.http.get(this.apiUrl)
  }

  submitCampaignsData(data:any){
    return this.http.post(this.apiUrl,data)
  }
}
