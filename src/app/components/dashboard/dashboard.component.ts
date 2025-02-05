import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Chart } from 'chart.js/auto';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  campaigns: any
  filteredCampaigns: any;
  campaignForm: FormGroup;
  chart: any;

  constructor( private fb: FormBuilder, private dataService:DataService) {
    this.campaignForm = this.fb.group({
      date: ['', Validators.required],
      campaign_id: ['', Validators.required],
      campaign_name: ['', Validators.required],
      clicks: ['', Validators.required],
      impressions: ['', Validators.required],
      spend: ['', Validators.required],
      conversions: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchCampaigns();
  }

  fetchCampaigns() {
    this.dataService.fetchCampaignsList().subscribe(data => {
      this.campaigns = data;
      this.filteredCampaigns = data;
      console.log("Data is ",data)
      this.renderChart();
    });
  }
  
  filterCampaigns(event: Event) {
    const query = (event.target as HTMLInputElement).value; 
  
    this.filteredCampaigns = this.campaigns.filter((c:any )=> 
      c.campaign_name.toLowerCase().includes(query.toLowerCase())
    );
  }
  

  submitCampaign() {
    if (this.campaignForm.valid) {
      console.log(this.campaignForm.value)
      this.dataService.submitCampaignsData(this.campaignForm.value).subscribe(() => {
        this.fetchCampaigns();
        this.campaignForm.reset();
        Swal.fire({
          icon: 'success',
          title: 'Campaign Submitted!',
          text: 'Your campaign was submitted successfully.',
          confirmButtonText: 'OK',
        });
      });
    }
  }

  renderChart() {
    if (this.chart) this.chart.destroy();
    
    const spendData = this.campaigns.map((c:any) => c.spend);
    const conversionsData = this.campaigns.map((c:any) => c.conversions);
    const labels = this.campaigns.map((c:any) => c.campaign_name);

    this.chart = new Chart('campaignChart', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          { label: 'Spend', data: spendData, borderColor: 'blue', fill: false },
          { label: 'Conversions', data: conversionsData, borderColor: 'green', fill: false }
        ]
      }
    });
  }
}
