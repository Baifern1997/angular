import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AppBreadcrumbService } from '../../app.breadcrumb.service';
import { dashboardService } from './dashboard.service'
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class DashboardComponent implements OnInit {

  constructor(private breadcrumbService: AppBreadcrumbService, private dashboard: dashboardService,private route: ActivatedRoute,private messageService: MessageService) { }
  lineData: any;
  events: any[];
  options: any;
  timelineEvents: any[];
  changedEvent: any;
  today = new Date
  Name_Pet
  Age_Pet
  Gender_Pet
  weight_pet
  breed_pet
  cities=[]
  chartsOptions: any;
  label=[]
  data_weight=[]
   ngOnInit() {
   this.dashboard.getmenu({ user: sessionStorage.getItem('user')}).then((data_pet_name)=>{
    for(let i=0; i<data_pet_name.pet.length; i++){
      let data_array={name:data_pet_name.pet[i].pet_name,code:data_pet_name.pet[i].pet_id}
      this.cities.push(data_array)
}
    })
    
    this.breadcrumbService.setItems([
      { label: 'dashboard', routerLink: ['/home/dashboard'] }
    ]);

    this.options = {
      plugins: [ dayGridPlugin, timeGridPlugin, interactionPlugin ],
      defaultDate: this.today,
      header: {
          left: 'prev,next',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      editable: true,
      eventClick: (e) => {
         
      }
  };
  }

  getLineData() {

    const dataset1Color = 'light' ? '#00ACC1' : '#4DD0E1';
    const dataset2Color = 'light' ? '#FF9800' : '#FFB74D';

    return {
        labels: this.label,
        datasets: [
            {
                label: 'weight',
                data: this.data_weight,
                fill: false,
                backgroundColor: dataset1Color,
                borderColor: dataset1Color,
            }
        ]
    };
}

getChartOptions() {
  const textColor = getComputedStyle(document.body).getPropertyValue('--text-color') || 'rgba(0, 0, 0, 0.87)';
  const gridLinesColor = getComputedStyle(document.body).getPropertyValue('--divider-color') || 'rgba(160, 167, 181, .3)';
  const fontFamily = getComputedStyle(document.body).getPropertyValue('--font-family');
  return {
      legend: {
          display: true,
          labels: {
              fontFamily,
              fontColor: textColor,
          }
      },
      responsive: true,
      scales: {
          yAxes: [{
              ticks: {
                  fontFamily,
                  fontColor: textColor
              },
              gridLines: {
                  color: gridLinesColor
              }
          }],
          xAxes: [{
              ticks: {
                  fontFamily,
                  fontColor: textColor
              },
              gridLines: {
                  color: gridLinesColor
              }
          }]
      }
  }
}

  async changedata(data){
    this.dashboard.getdashboard({ user: sessionStorage.getItem('user'),pet:data.code}).then(data => {
      const format2 = "YYYY-MM-DD"

      if(data.treatment.length >0){
        let datestart = new Date();
        let dateend = new Date(data.treatment[data.treatment.length-1].date_treatment);
        if(dateend >=datestart){
          this.messageService.add({severity: 'warn', summary: data.treatment[data.treatment.length-1].pet_disease, detail: moment(data.treatment[data.treatment.length-1].date_treatment).format(format2)});
        }
      }
      let array = []
      for (let i = 0; i < data.treatment.length; i++) {
        let adddata = {
          status: data.treatment[i].pet_disease, date:moment(data.treatment[i].date_treatment).format(format2), icon: "pi pi-check-square", color: '#E91E63', description: data.treatment[i].pet_illness
        }
        array.push(adddata)
      }

      this.timelineEvents = array
      let arrayevent = []

      for (let i = 0; i < data.appointment.length; i++) {
        var date = new Date(data.appointment[i].start);

     let adddata = {
          "id": i,
          "title": data.appointment[i].title,
          "start": moment(date).format(format2)
        }
          arrayevent.push(adddata)
      }
      this.events=arrayevent
       this.Name_Pet = data.pet[0].pet_name
    this.Age_Pet = data.pet[0].pet_age
    this.Gender_Pet = data.pet[0].pet_gender
    this.weight_pet = data.pet[0].pet_weight
    this.breed_pet = data.pet[0].pet_breed
    this.label=[]
    this.data_weight=[]
    for(let i=0; i<data.label.length; i++){
        this.label.push(data.label[i].pet_age)
    }
    for(let i=0; i<data.weight.length; i++){
      this.data_weight.push(data.weight[i].pet_weight)
  }
  this.lineData = this.getLineData();
  this.chartsOptions = this.getChartOptions();
      });
     
  }
}
