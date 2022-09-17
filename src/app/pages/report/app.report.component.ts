import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ReportService } from './app.report.service'
import { RouterModule, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PetService } from '../pet/pet.service'
import { Pet } from '../pet/pet'
import {report} from './report'
import { AppBreadcrumbService } from '../../app.breadcrumb.service';

@Component({
  selector: 'app-report',
  templateUrl: './app.report.component.html',
  providers: [ConfirmationService, MessageService]
})

export class AppReportComponent {
  productDialog: boolean;
  loginForm: FormGroup;
  registerForm: FormGroup;
  submitted: boolean;
  Pets: Pet[];
  user = sessionStorage.getItem('user')
  selecteduser: null
  reports: report[];
  constructor(private reportservice:ReportService,private breadcrumbService: AppBreadcrumbService,private petService: PetService, private router: Router, private service: MessageService) {
  }
  ngOnInit() {
    this.breadcrumbService.setItems([
      { label: 'repot', routerLink: ['/home/repot'] }
    ]);
    this.petService.getdropdown({ action: 'user' }).then(data => this.user = data);

  }

  selectdata() {
   this.reportservice.Report(this.selecteduser).then(data => this.reports =data)
  }

}
