import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { AppBreadcrumbService } from '../../app.breadcrumb.service';
import { PetService } from './pet.service'
import { Pet } from './pet'
import { treatment } from './treatment'
import { Vaccine } from './vaccine'
import { appointment } from './appointment'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class PetComponent implements OnInit {

  dateTime = new Date();

  constructor(private breadcrumbService: AppBreadcrumbService,
    private petService: PetService, private formBuilder: FormBuilder, private messageService: MessageService, private confirmationService: ConfirmationService) {
    this.dateTime.setDate(this.dateTime.getDate() - 1);
  }

  strdate: string;
  petDialog: boolean;
  treatmentDialog: boolean;
  vaccineDialog: boolean;
  appointmentDialog: boolean;
  gender
  status
  today = new Date();

  Pets: Pet[];
  treatments: treatment[]
  appointments: appointment[]
  vaccines:Vaccine[]

  Pet: Pet;
  treatment: treatment
  appointment: appointment
  vaccine:Vaccine

  user: any[];
  submitted: boolean;

  selectedPet: Pet[];
  selectedtreatment: treatment[]
  selectedappointment: appointment[]
  selectedvaccine:Vaccine[]

  selecteduser: null
  dataForm: FormGroup;
  dataFormtreatment: FormGroup;
  dataFormappointment: FormGroup;
  dataFormvaccine: FormGroup;

  pet_id: number
  pet_treatment_id: number
  pet_appointment_id: number
  pet_vaccine_id: number

  dataobject: Pet[];
  ngOnInit(): void {
    this.breadcrumbService.setItems([
      { label: 'pet', routerLink: ['/home/pet'] }
    ]);
    this.petService.getPets({}).then(data => this.Pets = data);
    this.petService.getdropdown({ action: 'user' }).then(data => this.user = data);
    this.gender = [
      { name: 'เพศผู้', code: 'M' },
      { name: 'เพศเมีย ', code: 'F' },
    ];
    this.status = [
      { name: 'ติดตาม', code: 'F' },
      { name: 'ฉีดวัคซีน', code: 'V' },
    ]
    this.dataForm = this.formBuilder.group({
      pet_age: new FormControl(null, []),
      pet_name: new FormControl(null, [Validators.required]),
      pet_gender: new FormControl(null, [Validators.required]),
      pet_weight: new FormControl(null, [Validators.required]),
      pet_breed: new FormControl(null, [Validators.required]),
      pet_type: new FormControl(null, [Validators.required]),
      pet_date: new FormControl(null, [Validators.required]),
    });
    this.dataFormtreatment = this.formBuilder.group({
      date_treatment: new FormControl(null, [Validators.required]),
      treatment_vaccine: new FormControl(null, []),
      pet_disease: new FormControl(null, [Validators.required]),
      pet_illness: new FormControl(null, [Validators.required]),
      pet_remedy: new FormControl(null, [Validators.required]),
    });
    this.dataFormappointment = this.formBuilder.group({
      date_appointment: new FormControl(null, [Validators.required]),
      status_appointment: new FormControl(null, [Validators.required]),
      description_appointment: new FormControl(null, [Validators.required]),
    });
    this.dataFormvaccine = this.formBuilder.group({
      vaccine_name: new FormControl(null, [Validators.required]),
      vaccine_dec: new FormControl(null, [Validators.required]),
    });
  }

  openNew() {
    this.dataForm.reset();
    this.pet_id = null;
    this.strdate = null;
    this.petDialog = true;
  }

  hideDialog() {
    this.petDialog = false;
  }

  selectdata() {
    this.petService.getPets(this.selecteduser).then(data => this.Pets = data);
  }

  selectRow(Pet: Pet) {
    let dataage = this.selectedPet
    this.petService.gettreatment(this.selectedPet).then(data => this.treatments = data)
     this.petService.getappointment(this.selectedPet).then(data => this.appointments = data)
    this.petService.getvaccine(this.selectedPet).then(data => this.vaccines = data)
      this.strdate = dataage['pet_age']
  }
  async editpet(Pet: Pet) {
    this.pet_id = Pet.pet_id;
    const formattedDate = new Date(Pet.pet_date);
    const gender = this.gender.filter(data => data.code == Pet.pet_gender);
    this.dataForm.setValue({
      pet_age: Pet.pet_age,
      pet_name: Pet.pet_name,
      pet_gender: gender['0'],
      pet_weight: Pet.pet_weight,
      pet_breed: Pet.pet_breed,
      pet_type: Pet.pet_type,
      pet_date: formattedDate,
    });
    this.strdate = Pet.pet_age
    this.petDialog = true;
  }

  savepet() {

    this.dataForm.value.CREATE_BY = sessionStorage.getItem('user')
    this.dataForm.value.pet_age = this.strdate
    let datajson = { ...this.dataForm.value, ...{ ID_LOGIN: this.selecteduser } }

    if (this.pet_id) {
      datajson.pet_id = this.pet_id
      this.petService.updatePet(datajson).then(data => this.petService.getPets(this.selecteduser).then(data => this.Pets = data));
      this.petDialog = false;
    } else {
      if (this.selecteduser == null) {
        this.messageService.add({ severity: 'error', summary: 'wrong', detail: 'please select username' });
        return false
      }
      this.petService.insertPet(datajson).then(data => this.petService.getPets(this.selecteduser).then(data => this.Pets = data));
      this.petDialog = false;
    }
  }

  deletePet(Pet: Pet) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + Pet.pet_id + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let datajson = {
          pet_id: Pet.pet_id
        }
        this.petService.deletePet(datajson)
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Pet Deleted', life: 3000 });
        this.petService.getPets(this.selecteduser).then(data => this.Pets = data)
      }
    });
  }
  ///////////////////////////////////////////<!----------treatment---------------->///////////////////////////////////////////////////////////////////////////////
  selectRowtreatment() {
    this.petService.getappointment(this.selectedtreatment).then(data => this.appointments = data)
    this.petService.getvaccine(this.selectedtreatment).then(data => this.vaccines = data)
  }
  openNewtreatment() {
    this.dataFormtreatment.reset();
    this.pet_treatment_id = null;
    this.treatmentDialog = true;
  }
  

  hidetreatmentDialog() {
    this.treatmentDialog = false;
  }

  savetreatment() {
    this.dataFormtreatment.value.CREATE_BY = sessionStorage.getItem('user')
    this.dataFormtreatment.value.pet_id = this.selectedPet['pet_id']
    if (this.pet_treatment_id) {
      this.dataFormtreatment.value.pet_treatment_id = this.pet_treatment_id
      this.petService.updatetreatment(this.dataFormtreatment.value).then(data => this.petService.gettreatment(this.selectedPet).then(data => this.treatments = data));
      this.treatmentDialog = false;
    } else {
      this.petService.inserttreatment(this.dataFormtreatment.value).then(data => this.petService.gettreatment(this.selectedPet).then(data => this.treatments = data));
      this.treatmentDialog = false;
    }
  }

  edittreatment(treatment: treatment) {
    this.pet_treatment_id = treatment.pet_treatment_id;
    const time = treatment.date_treatment;
    const date = new Date(time)
    this.dataFormtreatment.setValue({
      date_treatment: date,
      treatment_vaccine: treatment.treatment_vaccine,
      pet_disease: treatment.pet_disease,
      pet_illness: treatment.pet_illness,
      pet_remedy: treatment.pet_remedy,
    });
    this.treatmentDialog = true;
  }

  deletetreatment(treatment: treatment) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + treatment.pet_treatment_id + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let datajson = {
          pet_treatment_id: treatment.pet_treatment_id
        }
        this.petService.deletetreatment(datajson)
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'treatment Deleted', life: 3000 });
        this.petService.gettreatment(this.selectedPet).then(data => this.treatments = data)
      }
    });
  }


  ///////////////////////////////////////////<!----------vaccine---------------->///////////////////////////////////////////////////////////////////////////////
  openNewvaccine() {
    this.dataFormvaccine.reset();
    this.pet_vaccine_id = null;
    this.vaccineDialog = true;
  }

  hidevaccineDialog() {
    this.vaccineDialog = false;
  }

  savevaccine() {
    this.dataFormvaccine.value.CREATE_BY = sessionStorage.getItem('user')
    this.dataFormvaccine.value.pet_id = this.selectedPet['pet_id']
    if (this.pet_vaccine_id) {
      this.dataFormvaccine.value.id_vaccine = this.pet_vaccine_id
      this.petService.updatevaccine(this.dataFormvaccine.value).then(data => this.petService.getvaccine(this.selectedPet).then(data => this.vaccines = data));
      this.vaccineDialog = false;
    } else {
      this.petService.insertvaccine(this.dataFormvaccine.value).then(data => this.petService.getvaccine(this.selectedPet).then(data => this.vaccines = data));
      this.vaccineDialog = false;
    }
  }

  editvaccine(vaccine: Vaccine) {
    this.pet_vaccine_id = vaccine.id_vaccine;
    this.dataFormvaccine.setValue({
      vaccine_name:vaccine.vaccine_name,
      vaccine_dec: vaccine.vaccine_dec
    });
    this.vaccineDialog = true;
  }

  deletevaccine(vaccine: Vaccine) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + vaccine.id_vaccine + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let datajson = {
          id_vaccine: vaccine.id_vaccine
        }
        this.petService.deletevaccine(datajson)
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'appointment Deleted', life: 3000 });
        this.petService.getvaccine(this.selectedvaccine).then(data => this.vaccines = data)
      }
    });
  }
  ///////////////////////////////////////////<!----------Appointment---------------->///////////////////////////////////////////////////////////////////////////////
  openNewappointment() {
    this.dataFormappointment.reset();
    this.pet_appointment_id = null;
    this.appointmentDialog = true;
  }

  hideappointmentDialog() {
    this.appointmentDialog = false;
  }

  saveappointment() {
    this.dataFormappointment.value.CREATE_BY = sessionStorage.getItem('user')
    this.dataFormappointment.value.pet_id = this.selectedPet['pet_id']
    if (this.pet_appointment_id) {
      this.dataFormappointment.value.pet_appointment_id = this.pet_appointment_id
      this.petService.updateappointment(this.dataFormappointment.value).then(data => this.petService.getappointment(this.selectedtreatment).then(data => this.appointments = data));
      this.appointmentDialog = false;
    } else {
      this.petService.insertappointment(this.dataFormappointment.value).then(data => this.petService.getappointment(this.selectedtreatment).then(data => this.appointments = data));
      this.appointmentDialog = false;
    }

  }

  editappointment(appointment: appointment) {
    this.pet_appointment_id = appointment.pet_appointment_id;
    const time = appointment.date_appointment;
    const date = new Date(time)
    const status = this.status.filter(data => data.code == appointment.status_appointment);
    this.dataFormappointment.setValue({
      date_appointment: date,
      status_appointment: status['0'],
      description_appointment: appointment.description_appointment
    });
    this.appointmentDialog = true;
  }

  deleteappointment(appointment: appointment) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + appointment.pet_appointment_id + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let datajson = {
          pet_appointment_id: appointment.pet_appointment_id
        }
        this.petService.deleteappointment(datajson)
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'appointment Deleted', life: 3000 });
        this.petService.getappointment(this.selectedPet).then(data => this.appointments = data)
      }
    });
  }

  getAge(dateString) {
    var d = new Date(dateString);
    var day = this.checkZero(d.getDate() + "");
    var month = this.checkZero((d.getMonth() + 1) + "");
    var year = this.checkZero(d.getFullYear() + "");
    dateString = month + "/" + day + "/" + year + ""
    let now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    var yearNow = now.getFullYear();
    var monthNow = now.getMonth();
    var dateNow = now.getDate();

    var dob = new Date(dateString.substring(6, 10),
      dateString.substring(0, 2) - 1,
      dateString.substring(3, 5));

    var yearDob = dob.getFullYear();
    var monthDob = dob.getMonth();
    var dateDob = dob.getDate();
    var ageString = "";
    var yearString = "";
    var monthString = "";
    var dayString = "";


    let yearAge = yearNow - yearDob;

    if (monthNow >= monthDob)
      var monthAge = monthNow - monthDob;
    else {
      yearAge--;
      var monthAge = 12 + monthNow - monthDob;
    }

    if (dateNow >= dateDob)
      var dateAge = dateNow - dateDob;
    else {
      monthAge--;
      var dateAge = 31 + dateNow - dateDob;

      if (monthAge < 0) {
        monthAge = 11;
        yearAge--;
      }
    }

    let age = {
      years: yearAge,
      months: monthAge,
      days: dateAge
    };
    if (age.years > 1) yearString = " years";
    else yearString = " year";
    if (age.months > 1) monthString = " months";
    else monthString = " month";
    if (age.days > 1) dayString = " days";
    else dayString = " day";

    ageString = age.years + yearString + " " + age.months + monthString + " " + age.days + dayString;

    this.strdate = ageString
    return ageString;
  }

  checkZero(data) {
    if (data.length == 1) {
      data = "0" + data;
    }
    return data;
  }
}