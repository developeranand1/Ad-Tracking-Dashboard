import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
 private apiUrl = 'https://backend-g7xiuthmv-anand-chaudharys-projects.vercel.app/api/metrics';

  constructor(private http:HttpClient) { }


  fetchCampaignsList(){
    return this.http.get(this.apiUrl)
  }

  submitCampaignsData(data:any){
    return this.http.post(this.apiUrl,data)
  }
}
